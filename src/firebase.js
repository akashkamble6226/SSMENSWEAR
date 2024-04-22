// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyzCDnUjbmzw_GfCH1UaO0I7_CkC0NOZ4",
  authDomain: "ssmenswear-950c5.firebaseapp.com",
  projectId: "ssmenswear-950c5",
  storageBucket: "ssmenswear-950c5.appspot.com",
  messagingSenderId: "384575749974",
  appId: "1:384575749974:web:3d6a94b1400fc852e320f7",
  measurementId: "G-F2HCVZDKEF"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export default app;