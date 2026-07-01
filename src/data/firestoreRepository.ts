import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  type DocumentData,
  type QueryConstraint,
} from 'firebase/firestore';

import { firestoreDb } from '../lib/firebase';
import type { CollectionName } from './collections';

function requireDb() {
  if (!firestoreDb) {
    throw new Error('Firestore is not configured.');
  }

  return firestoreDb;
}

export async function getRecord<T>(
  collectionName: CollectionName,
  id: string,
): Promise<T | null> {
  const snapshot = await getDoc(doc(requireDb(), collectionName, id));
  return snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as T) : null;
}

export async function listRecords<T>(
  collectionName: CollectionName,
  options: { limit?: number; orderByField?: string; descending?: boolean } = {},
): Promise<T[]> {
  const constraints: QueryConstraint[] = [];

  if (options.orderByField) {
    constraints.push(orderBy(options.orderByField, options.descending ? 'desc' : 'asc'));
  }

  if (options.limit) {
    constraints.push(limit(options.limit));
  }

  const snapshot = await getDocs(query(collection(requireDb(), collectionName), ...constraints));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as T));
}

export async function createRecord<T extends DocumentData>(
  collectionName: CollectionName,
  data: T,
): Promise<string> {
  const reference = await addDoc(collection(requireDb(), collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    version: 1,
  });

  return reference.id;
}

export async function setRecord<T extends DocumentData>(
  collectionName: CollectionName,
  id: string,
  data: T,
): Promise<void> {
  await setDoc(doc(requireDb(), collectionName, id), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    version: 1,
  });
}

export async function updateRecord<T extends DocumentData>(
  collectionName: CollectionName,
  id: string,
  patch: T,
): Promise<void> {
  await updateDoc(doc(requireDb(), collectionName, id), {
    ...patch,
    updatedAt: serverTimestamp(),
  });
}
