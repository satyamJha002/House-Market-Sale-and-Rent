import React, { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const defaultTheme = createTheme();
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
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  placeholder="Enter the name"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter the email"
                />
              </Grid>

              <Grid item xs={12} sx={{ display: "flex", gap: 1 }}>
                <TextField
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter the password"
                  value={password}
                  name="password"
                  onChange={handleChange}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {showPassword ? (
                          <MdVisibilityOff
                            onClick={() =>
                              setShowPassword((prevState) => !prevState)
                            }
                          />
                        ) : (
                          <MdVisibility
                            onClick={() =>
                              setShowPassword((prevState) => !prevState)
                            }
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />

                {/*  */}
              </Grid>
              {/* <div>
              <p>Sign Up</p>
              <button>
                <BsArrowRightCircle fill="#fff" width="34px" height="34px" />
              </button>
            </div> */}
            </Grid>
            <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end" sx={{ color: "" }}>
              <Grid>
                <Link to="/forgot-password" className="">
                  Forgot password
                </Link>
              </Grid>
            </Grid>
            {/* Google oAuth */}
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <OAuth />
              <Grid>
                <Grid item>
                  <Link
                    to="/sign-in"
                    style={{ color: "blue", fontSize: "20px" }}
                  >
                    Already User ? Sign In .
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
