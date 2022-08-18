import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBFbBBB0jwAM_5fjepMu5xy_m0nQavpfOw",
    authDomain: "cms-ticket-sale-fe2f1.firebaseapp.com",
    projectId: "cms-ticket-sale-fe2f1",
    storageBucket: "cms-ticket-sale-fe2f1.appspot.com",
    messagingSenderId: "474831458240",
    appId: "1:474831458240:web:078c6913188fe4f63e4225",
    measurementId: "G-SWXKK6BCW3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);