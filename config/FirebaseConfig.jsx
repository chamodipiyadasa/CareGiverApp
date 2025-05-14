// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Import Firestore correctly
// import { getAnalytics } from "firebase/analytics"; (Optional: Include only if analytics is needed)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjuVTvk00UPuU-KfBE0C0UN34nZPFvHog",
  authDomain: "shenal-9a640.firebaseapp.com",
  projectId: "shenal-9a640",
  storageBucket: "shenal-9a640.appspot.com",
  messagingSenderId: "595682332171",
  appId: "1:595682332171:web:5e2eadc186918e1b77010e",
  measurementId: "G-G2QBC9GLSN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);  // Correct Firestore initialization
// const analytics = getAnalytics(app); (Optional: Include only if analytics is needed)
