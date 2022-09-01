import app from './app.js';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from 'firebase/firestore/lite';

export async function subscribeToClub(subscription) {
  const data = getFirestore(app);
  const clubCollection = collection(data, 'mundo - invertido');
  const docRef = await addDoc(clubCollection, subscription);
  return docRef.id;
}

export async function getSubscribes() {
  const data = getFirestore(app);
  const clubCollection = collection(data, 'mundo - invertido');
  const clubCollectionSnapshot = await getDocs(clubCollection);
  const subscribes = clubCollectionSnapshot.docs.map(doc => doc.data());
  return subscribes;
}
