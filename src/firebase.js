// Firebase initialization (migrated from app/js/app.js)
import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';

const fireConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
};

export const firebaseApp = initializeApp(fireConfig);
export const db = getDatabase(firebaseApp);
export const cheatsheetsRef = (topic) => ref(db, `cheatsheets/${topic}`);
