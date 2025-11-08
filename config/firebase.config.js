// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApzwoYqObbpf7cbey7fEntpJ817tWCwRA",
  authDomain: "five20-bfcf8.firebaseapp.com",
  projectId: "five20-bfcf8",
  storageBucket: "five20-bfcf8.firebasestorage.app",
  messagingSenderId: "584767955601",
  appId: "1:584767955601:web:70eceebf66ebf978f9d530",
  measurementId: "G-38VHGVB482",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initializ Authentication
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);
