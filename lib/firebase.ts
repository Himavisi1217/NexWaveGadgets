import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDoA5633WVsDHFfy_bsTbwBrWKdda7jOME",
  authDomain: "next-wave-gadgets.firebaseapp.com",
  projectId: "next-wave-gadgets",
  storageBucket: "next-wave-gadgets.appspot.com",
  messagingSenderId: "555026220609",
  appId: "1:555026220609:web:your-app-id", // Replace with your actual appId if needed
  measurementId: "G-your-measurement-id" // Optional
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
