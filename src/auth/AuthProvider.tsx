import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';

import {
  firebaseAuth,
  initializeFirebaseAuth,
  isFirebaseConfigured,
} from '../lib/firebase';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  configured: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = firebaseAuth;

    if (!auth) {
      setLoading(false);
      return;
    }

    let active = true;
    let unsubscribe: (() => void) | undefined;

    const initialize = async () => {
      try {
        await initializeFirebaseAuth();

        if (!active) {
          return;
        }

        unsubscribe = onAuthStateChanged(
          auth,
          (nextUser) => {
            if (!active) {
              return;
            }

            setUser(nextUser);
            setLoading(false);
          },
          () => {
            if (!active) {
              return;
            }

            setUser(null);
            setLoading(false);
          },
        );
      } catch {
        if (active) {
          setUser(null);
          setLoading(false);
        }
      }
    };

    void initialize();

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      configured: isFirebaseConfigured,

      signIn: async (email, password) => {
        const auth = firebaseAuth;

        if (!auth) {
          throw new Error('Firebase configuration is incomplete.');
        }

        await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password,
        );
      },

      signOutUser: async () => {
        const auth = firebaseAuth;

        if (!auth) {
          return;
        }

        await signOut(auth);
      },
    }),
    [user, loading],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }

  return context;
}
