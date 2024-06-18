
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey:import.meta.env.VITE_API_KEY,
  authDomain: "chatify-c2c9c.firebaseapp.com",
  projectId: "chatify-c2c9c",
  storageBucket: "chatify-c2c9c.appspot.com",
  messagingSenderId: "506129865043",
  appId: "1:506129865043:web:bab55e02325c91c16369a6",
  measurementId: "G-1DQJSTH3PG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


export const auth=getAuth();
export const db=getFirestore();
export const storage =getStorage();