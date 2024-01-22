import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBfZHQcRXAptT8JmUmBer7DIA1xER1EnN4",
  authDomain: "task-management-442f9.firebaseapp.com",
  projectId: "task-management-442f9",
  storageBucket: "task-management-442f9.appspot.com",
  messagingSenderId: "448841500385",
  appId: "1:448841500385:web:50b780487393216b4419a0",
  measurementId: "G-2GRCR2VMWN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getDatabase();