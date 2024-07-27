import React, { useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const formDataCopy = { ...formData };
      delete formDataCopy.password;

      formDataCopy.timesStamp = serverTimestamp();

      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      toast.success("Register successfully, Please sign in.");
      navigate("/sign-in");
    } catch (error) {
      console.error(error);

      toast.error("Error is coming to registering up.");
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="nameInputDiv">
            <input
              id="name"
              type="text"
              name="name"
              className="nameInput"
              value={name}
              onChange={handleChange}
              placeholder="Enter the name"
            />
          </div>

          <div className="emailInputDiv">
            <input
              id="email"
              type="email"
              name="email"
              className="emailInput"
              value={email}
              onChange={handleChange}
              placeholder="Enter the email"
            />
          </div>

          <div className="passwordInputDiv">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter the password"
              className="passwordInput"
              value={password}
              name="password"
              onChange={handleChange}
            />

            {showPassword ? (
              <MdVisibilityOff
                onClick={() => setShowPassword((prevState) => !prevState)}
                style={{
                  fontSize: 30,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                  cursor: "pointer",
                }}
              />
            ) : (
              <MdVisibility
                onClick={() => setShowPassword((prevState) => !prevState)}
                style={{
                  fontSize: 30,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                  cursor: "pointer",
                }}
              />
            )}
          </div>

          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot password
          </Link>

          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <BsArrowRightCircle fill="#fff" width="34px" height="34px" />
            </button>
          </div>
        </form>

        {/* Google oAuth */}
        <OAuth />

        <Link to="/sign-in" className="registerLink">
          Already User ? Sign In .
        </Link>
      </div>
    </>
  );
};

export default SignUp;
