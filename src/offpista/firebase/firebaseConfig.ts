// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDhbP5Xw3YXUvacU5QYfFRa1GmH7-d1HtY',
  authDomain: 'videos-9e30a.firebaseapp.com',
  projectId: 'videos-9e30a',
  storageBucket: 'videos-9e30a.firebasestorage.app',
  messagingSenderId: '231292893948',
  appId: '1:231292893948:web:32eb0f228e10a675f5b579',
  measurementId: 'G-0LFVWWNTZT',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
