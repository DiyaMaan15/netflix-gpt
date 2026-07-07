// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNVD5jdQuyzcw_-xX6XVx72JRTQdyE7Sk",
  authDomain: "netflixgpt-3c29d.firebaseapp.com",
  projectId: "netflixgpt-3c29d",
  storageBucket: "netflixgpt-3c29d.appspot.com",
  messagingSenderId: "361902102792",
  appId: "1:361902102792:web:ecab69cc4b281ce95774bd",
  measurementId: "G-4PJLFGB9B6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(); 