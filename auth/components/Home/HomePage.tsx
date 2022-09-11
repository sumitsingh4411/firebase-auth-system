import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { auth, db, googleProvider } from "../../common/firebase-config";
import style from "./HomePage.module.css";

export default function HomePage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const createAccount = async () => {
    try {
      const user = await signInWithPopup(auth, googleProvider);
      // use this blog https://blog.logrocket.com/user-authentication-firebase-react-apps/
      // use this blog https://softauthor.com/firebase-get-user-data-by-uid/
      await addDoc(collection(db, "users"), {
        name: "sumit",
        email: user.user.email,
        uid: user.user.uid,
      });
      console.log(user);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className={style.container}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e: any) => {
          setEmail(e.target.value);
        }}
        className={style.input_cs}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e: any) => {
          setPassword(e.target.value);
        }}
        className={style.input_cs}
      />
      <button className={style.create_btn} onClick={createAccount}>
        Create account
      </button>
    </div>
  );
}
