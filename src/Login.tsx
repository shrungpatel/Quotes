import React from "react";
import "./App.css";
import Button from "@mui/material/Button";
import { Container, Link, TextField, Stack, Alert } from "@mui/material";
import ForgotPassword from "./ForgotPassword";
import { useNavigate } from "react-router-dom";
import { db } from "./Firebase";
import { collection, doc, getDoc } from "firebase/firestore";
function Login() {
  const navigate = useNavigate();
  const forgotClick = () => {
    navigate("/ForgotPassword");
  };
  const signup = () => {
    navigate("/SignUp");
  };
  const signin = () => {
    navigate("/Dashboard");
    // <div><Alert severity="success">Welcome back!</Alert></div>
  };
  const getLogin = async () => {
    const docRef = doc(db, "Users", "shrungkpatel@gmail.com");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  getLogin();
  return (
    <div className="App">
      <header className="App-header">
        <Container maxWidth="sm">
          <h1>Login</h1>
          <Stack spacing={2}>
            <div>
              <TextField id="username" label="Username" variant="filled" />
            </div>
            <div>
              <TextField id="password" label="Password" variant="filled" />
            </div>
          </Stack>
        </Container>
        <Link onClick={forgotClick}>Forgot Password</Link>
        <Link onClick={signup}>Create an account</Link>
        <Button onClick={signin} variant="contained">
          Sign in
        </Button>
      </header>
    </div>
  );
}

export default Login;