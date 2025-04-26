// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8FT3s2WBPK_MpNCfR7cuptcbuqBPI34U",
  authDomain: "res-app-rn.firebaseapp.com",
  projectId: "res-app-rn",
  storageBucket: "res-app-rn.firebasestorage.app",
  messagingSenderId: "909118960566",
  appId: "1:909118960566:web:be4ae554e7f0885a454717",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseConfig);
