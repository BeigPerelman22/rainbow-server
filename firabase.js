// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_tonwz7aQZSRbz6wIxxcCl1qWeWDNB3Y",
  authDomain: "rainbow-server-6a19e.firebaseapp.com",
  projectId: "rainbow-server-6a19e",
  storageBucket: "rainbow-server-6a19e.appspot.com",
  messagingSenderId: "957306084767",
  appId: "1:957306084767:web:30d0891cd93737091bb1aa",
  measurementId: "G-LRVXHC00G4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);