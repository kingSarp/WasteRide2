// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Add this import
import "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCebtGsOU4DiE-VpkxeW1DMl_UKxSx5ZOs",
  authDomain: "wasteride-2.firebaseapp.com",
  projectId: "wasteride-2",
  storageBucket: "wasteride-2.appspot.com",
  messagingSenderId: "88302451482",
  appId: "1:88302451482:web:f7283f2b86de29b9aa4aa3"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { firebaseConfig, firestore, auth };