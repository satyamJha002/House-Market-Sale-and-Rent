import React, { useState } from "react";
import { auth } from "../firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BiArrowToRight } from "react-icons/bi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset link is sent to register email");
    } catch (error) {
      toast.error("Could not send the email");
    }
  };
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={handleChange}
            className="emailInput"
          />

          <Link className="forgotPasswordLink" to="/sign-in">
            Sign In
          </Link>

          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>
            <button className="signInButton">
              <BiArrowToRight fill="#fff" width={34} height={34} />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ForgotPassword;
