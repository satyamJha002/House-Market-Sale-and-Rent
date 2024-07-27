import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { BsArrowRightCircle } from "react-icons/bs";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        toast.success("Welcome to the house marketplace.");
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid email or password!");
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>

        <form onSubmit={handleSubmit}>
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

          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className="signInButton">
              <BsArrowRightCircle fill="#fff" width="34px" height="34px" />
            </button>
          </div>
        </form>

        {/* Google oAuth */}
        <OAuth />

        <Link to="/sign-up" className="registerLink">
          Sign Up Instead
        </Link>
      </div>
    </>
  );
};

export default SignIn;
