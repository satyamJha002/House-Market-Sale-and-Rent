import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { BsGoogle } from "react-icons/bs";
import { Button, Grid } from "@mui/material";

const OAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogle = async () => {
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
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>Sign {location.pathname === "/sign-up" ? "up" : "in"} with</p>
      <Button sx={{ fontSize: "20px" }} onClick={handleGoogle}>
        <BsGoogle />
      </Button>
    </Grid>
  );
};

export default OAuth;
