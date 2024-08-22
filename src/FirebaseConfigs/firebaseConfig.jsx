// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "",
  authDomain: "musiqi11.firebaseapp.com",
  projectId: "musiqi11",
  storageBucket: "musiqi11.appspot.com",
  messagingSenderId: "12270441133",
  appId: "1:12270441133:web:871dee672d2967b2202c24",
  measurementId: "G-XNKQ2NKCXW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)
