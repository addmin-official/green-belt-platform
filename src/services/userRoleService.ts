import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';

import { firestoreDb } from '../lib/firebase';
import { isPlatformRole, type PlatformRole } from '../security/permissions';

function requireDb() {
  if (!firestoreDb) throw new Error('Firestore is not configured.');
  return firestoreDb;
}

export async function assignUserRole(input: {
  uid: string;
  email: string;
  role: PlatformRole;
  assignedBy: string;
  active?: boolean;
}): Promise<void> {
  if (!input.uid.trim()) throw new Error('User UID is required.');
  if (!input.email.trim()) throw new Error('User email is required.');
  if (!isPlatformRole(input.role)) throw new Error('Invalid platform role.');

  await setDoc(
    doc(requireDb(), 'users', input.uid),
    {
      email: input.email.trim().toLowerCase(),
      role: input.role,
      active: input.active ?? true,
      assignedBy: input.assignedBy,
      assignedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export async function deactivateUserRole(input: {
  uid: string;
  updatedBy: string;
}): Promise<void> {
  await updateDoc(doc(requireDb(), 'users', input.uid), {
    active: false,
    updatedBy: input.updatedBy,
    updatedAt: serverTimestamp(),
  });
}
