import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { BsArrowRightCircle } from "react-icons/bs";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
import {
  Avatar,
  Box,
  Button,
  createTheme,
  CssBaseline,
  Grid,
  InputAdornment,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const defaultTheme = createTheme();

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
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://png.pngtree.com/background/20231117/original/pngtree-real-estate-market-3d-rendered-concept-of-buying-or-selling-a-picture-image_6301687.jpg)",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "left",
          }}
        />
        <Grid>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                label="Email Address"
              />

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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link to="/forgot-password">Forgot password</Link>
                </Grid>
                <Grid item>
                  <Link to="/sign-up">Sign Up Instead</Link>
                </Grid>
              </Grid>
            </Box>
            <OAuth />
          </Box>
        </Grid>

        {/* Google oAuth */}
      </Grid>
    </ThemeProvider>
  );
};

export default SignIn;
