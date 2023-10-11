// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChPFhMfUpkdArrmCQF2F4A2hx16AU-iqg",
  authDomain: "quotesapp-acec6.firebaseapp.com",
  projectId: "quotesapp-acec6",
  storageBucket: "quotesapp-acec6.appspot.com",
  messagingSenderId: "598254827988",
  appId: "1:598254827988:web:c983882ffd837d97bebe41",
  measurementId: "G-QH9P2NM4WF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const firebaseapp = firebase.initializeApp(firebaseConfig);
export const storage = getStorage(app);