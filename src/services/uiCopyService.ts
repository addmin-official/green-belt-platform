import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { firestoreDb } from '../lib/firebase';

export type UiCopyMap = Record<string, string>;

function getDatabase() {
  if (!firestoreDb) throw new Error('Firestore is not configured.');
  return firestoreDb;
}

export async function loadUiCopy(): Promise<UiCopyMap> {
  const snapshot = await getDoc(doc(getDatabase(), 'publicContent', 'ui-copy'));
  if (!snapshot.exists()) return {};
  const entries = snapshot.data().entries;
  return typeof entries === 'object' && entries !== null
    ? (entries as UiCopyMap)
    : {};
}

export async function saveUiCopy(
  entries: UiCopyMap,
  updatedBy: string,
): Promise<void> {
  await setDoc(
    doc(getDatabase(), 'publicContent', 'ui-copy'),
    { entries, updatedBy, updatedAt: serverTimestamp() },
    { merge: true },
  );
}
