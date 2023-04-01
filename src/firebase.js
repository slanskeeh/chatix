import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvW99Lv0uK4IRwUAiuEj_JLuZ6vlQGLEw",
  authDomain: "online-chat-e2ef5.firebaseapp.com",
  projectId: "online-chat-e2ef5",
  storageBucket: "online-chat-e2ef5.appspot.com",
  messagingSenderId: "873113695162",
  appId: "1:873113695162:web:8460aa22915995d947a383",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
