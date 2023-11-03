// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSjf_U74Y5VFw57LsNXbRcbaiGLwpRsKc",
  authDomain: "zetatonfront.firebaseapp.com",
  projectId: "zetatonfront",
  storageBucket: "zetatonfront.appspot.com",
  messagingSenderId: "226667293804",
  appId: "1:226667293804:web:c750b7e34a04ce0d9d3c49",
  measurementId: "G-Z30TTD4R23",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// console.log("analytics", analytics);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage(app);
