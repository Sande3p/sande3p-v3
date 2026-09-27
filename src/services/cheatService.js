// cheatService.js - migrated from app/js/services.js (cheatSvc), using Firebase v9 modular SDK
import { onValue } from 'firebase/database';
import { cheatsheetsRef } from '../firebase';

// subscribes to realtime updates for a cheatsheet topic (e.g. 'git')
// returns an unsubscribe function
export function subscribeCheatsheet(topic, callback) {
  const dbRef = cheatsheetsRef(topic);
  return onValue(dbRef, (snapshot) => {
    callback(snapshot.val());
  });
}
