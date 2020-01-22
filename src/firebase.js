import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB0gEyh50EO1eBcn0cXTVVj4vfkXjsoT6c',
  authDomain: 'dungeon-ddf25.firebaseapp.com',
  databaseURL: 'https://dungeon-ddf25.firebaseio.com',
  projectId: 'dungeon-ddf25',
  storageBucket: 'dungeon-ddf25.appspot.com',
  messagingSenderId: '191383226146',
  appId: '1:191383226146:web:c3dab63b0728cc8126077b',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const app = firebase.app();
export const auth = firebase.auth();
export const db = firebase.firestore();
