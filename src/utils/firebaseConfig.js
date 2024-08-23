// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAF_X-Q301A3CAwkwJ-WxjaTIL9qNVX3ws",
  authDomain: "bootcamp-app-5d1fb.firebaseapp.com",
  projectId: "bootcamp-app-5d1fb",
  storageBucket: "bootcamp-app-5d1fb.appspot.com",
  messagingSenderId: "539483797635",
  appId: "1:539483797635:web:94a59a47808d9289d083b6",
  measurementId: "G-YN4B1W4BDK"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };