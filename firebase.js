// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from "firebase/database";
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
// const app = initializeApp(firebaseConfig);
export { firebaseConfig };
