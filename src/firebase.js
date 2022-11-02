import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "skinapp-ddc7f.firebaseapp.com",
  projectId: "skinapp-ddc7f",
  storageBucket: "skinapp-ddc7f.appspot.com",
  messagingSenderId: "25765008304",
  appId: "1:25765008304:web:729ee6eb4d0ba3b2c37c75",
  measurementId: "G-PR6DVD7CHD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
