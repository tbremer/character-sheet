import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const app = firebase.app();
export const auth = firebase.auth();
export const db = firebase.firestore();
