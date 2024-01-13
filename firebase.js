import { initializeApp } from "firebase/app";
import { getFirestore,doc, getDoc } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyA_lsmI_lhnMOpg1wrODAbpHpvleej6Zoc",
  authDomain: "dnot-d2d61.firebaseapp.com",
  databaseURL: "https://dnot-d2d61-default-rtdb.firebaseio.com",
  projectId: "dnot-d2d61",
  storageBucket: "dnot-d2d61.appspot.com",
  messagingSenderId: "992466223245",
  appId: "1:992466223245:web:e32e5c6b450ec7d687a2c4",
  measurementId: "G-YDN5YYG6VB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
