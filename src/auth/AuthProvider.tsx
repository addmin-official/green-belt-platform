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
  doc,
  getDoc,
} from 'firebase/firestore';

import {
  firebaseAuth,
  firestoreDb,
  initializeFirebaseAuth,
  isFirebaseConfigured,
} from '../lib/firebase';

export type UserRole = 'admin' | 'operator' | 'viewer' | null;

type AuthContextValue = {
  user: User | null;
  role: UserRole;
  loading: boolean;
  roleLoading: boolean;
  configured: boolean;
  isAdmin: boolean;
  isViewer: boolean;
  canEdit: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function loadUserRole(user: User): Promise<UserRole> {
  if (!firestoreDb) {
    return null;
  }

  const snapshot = await getDoc(
    doc(firestoreDb, 'users', user.uid),
  );

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  if (data.active !== true) {
    return null;
  }

  if (
    data.role === 'admin' ||
    data.role === 'operator' ||
    data.role === 'viewer'
  ) {
    return data.role;
  }

  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(false);

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
          async (nextUser) => {
            if (!active) {
              return;
            }

            setUser(nextUser);
            setRole(null);

            if (!nextUser) {
              setRoleLoading(false);
              setLoading(false);
              return;
            }

            setRoleLoading(true);

            try {
              const nextRole = await loadUserRole(nextUser);

              if (active) {
                setRole(nextRole);
              }
            } catch {
              if (active) {
                setRole(null);
              }
            } finally {
              if (active) {
                setRoleLoading(false);
                setLoading(false);
              }
            }
          },
          () => {
            if (!active) {
              return;
            }

            setUser(null);
            setRole(null);
            setRoleLoading(false);
            setLoading(false);
          },
        );
      } catch {
        if (active) {
          setUser(null);
          setRole(null);
          setRoleLoading(false);
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
      role,
      loading,
      roleLoading,
      configured: isFirebaseConfigured,
      isAdmin: role === 'admin',
      isViewer: role === 'viewer',
      canEdit: role === 'admin' || role === 'operator',

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
    [user, role, loading, roleLoading],
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
