import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState("");

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (result) => {
        const user = result.user;
        console.log("creating: ", user);
        setDoc(doc(db, "users", user.uid), {
          email,
          password,
          role: "user",
        });
      }
    );
  }

  function logIn(email, password) {
    console.log("Email", email);
    return signInWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
          setUser({ id: currentUser.uid, ...doc.data() });
        });
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  console.log("user is:", user);

  return (
    <userAuthContext.Provider value={{ user, signUp, logIn }}>
      {children}
    </userAuthContext.Provider>
  );
}
export function useUserAuth() {
  return useContext(userAuthContext);
}
