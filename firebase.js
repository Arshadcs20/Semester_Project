import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBDYQCvYH52CK8WHaOMirf6ZFMhaX2DUhU",
  authDomain: "competeapp-54c52.firebaseapp.com",
  projectId: "competeapp-54c52",
  storageBucket: "competeapp-54c52.appspot.com",
  messagingSenderId: "917838362479",
  appId: "1:917838362479:web:fa4c20f8947fc8c689da9a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };
