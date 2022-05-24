// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "phero-10.firebaseapp.com",
    projectId: "phero-10",
    storageBucket: "phero-10.appspot.com",
    messagingSenderId: "368151122552",
    appId: "1:368151122552:web:d6231c5ac122facc04538d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp