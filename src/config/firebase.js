// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDQ5_A5mbbB_II4D5htnz7re2Juwv90iW4",
  authDomain: "react-fire-base-38d2c.firebaseapp.com",
  projectId: "react-fire-base-38d2c",
  storageBucket: "react-fire-base-38d2c.appspot.com",
  messagingSenderId: "890607411613",
  appId: "1:890607411613:web:836d4c59845766db9fcf74",
  measurementId: "G-ZQV5LR8NR1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);