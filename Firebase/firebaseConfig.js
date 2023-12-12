import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
const firebaseConfig = {
   apiKey: "AIzaSyCSPxptSrqkhb4RH-q-THO18cBfiY5ekfw",
  authDomain: "hu-eats-2f662.firebaseapp.com",
  projectId: "hu-eats-2f662",
  storageBucket: "hu-eats-2f662.appspot.com",
  messagingSenderId: "175497629710",
  appId: "1:175497629710:web:622f69ffaa7deb49afec5f",
  measurementId: "G-QFK8YTQLP9"};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore(); // Use this instead of db.collection

export { firebase }
export { db };
