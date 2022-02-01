import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvn23BL7yaNhoHapxRJ8IS-ymQ4FWzUkg",
  authDomain: "mangan-da-kita-9ed52.firebaseapp.com",
  projectId: "mangan-da-kita-9ed52",
  storageBucket: "mangan-da-kita-9ed52.appspot.com",
  messagingSenderId: "218905729732",
  appId: "1:218905729732:web:f99a50525a86a33956c791",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
