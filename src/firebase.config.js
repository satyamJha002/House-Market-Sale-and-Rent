import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_GOOGLE_API_KEY,
  authDomain: "house-marketplace-app-aa947.firebaseapp.com",
  projectId: "house-marketplace-app-aa947",
  storageBucket: "house-marketplace-app-aa947.appspot.com",
  messagingSenderId: "494970529150",
  appId: "1:494970529150:web:56e581a1e9df6e3cc6bf2f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
