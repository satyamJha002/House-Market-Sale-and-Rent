import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { BsGoogle } from "react-icons/bs";

const OAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogle = async () => {
    1;
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("User", user);

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      navigate("/");
      toast.success("Sign in successfully");
    } catch (error) {
      console.log(error);
      toast.error("Could not sign in.");
    }
  };
  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === "/sign-up" ? "up" : "in"} with</p>
      <button className="socialIconDiv" onClick={handleGoogle}>
        <BsGoogle className="socialIconImg" />
      </button>
    </div>
  );
};

export default OAuth;
