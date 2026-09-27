// Firebase initialization (migrated from app/js/app.js)
import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';

const fireConfig = {
  apiKey: 'AIzaSyDU7i_KC4yPk5NHY7s6ytSR8j_CfipCP8I',
  authDomain: 'sans-83799.firebaseapp.com',
  databaseURL: 'https://sans-83799.firebaseio.com',
  storageBucket: 'sans-83799.appspot.com',
  messagingSenderId: '736771219117',
};

export const firebaseApp = initializeApp(fireConfig);
export const db = getDatabase(firebaseApp);
export const cheatsheetsRef = (topic) => ref(db, `cheatsheets/${topic}`);
