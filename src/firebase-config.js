import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // for authentication


// the web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8T1RdBZ_KMHog05Cq6mM52LjIfh_3MrI",
  authDomain: "cue-assets.firebaseapp.com",
  databaseURL: "https://cue-assets-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cue-assets",
  storageBucket: "cue-assets.firebasestorage.app",
  messagingSenderId: "759212786545",
  appId: "1:759212786545:web:d82adb42dbfc8b7fabacd0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);