import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBnk76RZxuUamGQ2P8Sz2IgqZeJ1vnlQ3s",
  authDomain: "iths-crossplatform-7250f.firebaseapp.com",
  projectId: "iths-crossplatform-7250f",
  storageBucket: "iths-crossplatform-7250f.appspot.com",
  messagingSenderId: "810972524058",
  appId: "1:810972524058:web:3839b12d07581684beaba3",
  measurementId: "G-TXXHY814W5"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore()
