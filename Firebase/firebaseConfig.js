import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";  // Add this line for Firebase Storage


const firebaseConfig = {
    apiKey: "AIzaSyDByh2QonwoWUFx5HRvriJuZG_oiVM0QrU",
    authDomain: "foodapp2-4ba23.firebaseapp.com",
    projectId: "foodapp2-4ba23",
    storageBucket: "foodapp2-4ba23.appspot.com",
    messagingSenderId: "269744887751",
    appId: "1:269744887751:web:23879bac40f9ff96b76be2",
    measurementId: "G-FPY9C1VV8C"};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }