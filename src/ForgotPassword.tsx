import React, { lazy } from "react";
import "./App.css";
import { Button, Box } from "@mui/material/";
import { Container, Link, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
function ForgotPassword() {
  const navigate = useNavigate();
  const loginClick = () => {
    navigate("/Login");
  };
  return (
    <div className="App">
      <header className="App-header">
        <Box className="App-box">
          <Container maxWidth="sm">
            <h1>Forgot Password</h1>
            <div>
              <TextField id="email" label="Enter your email" variant="filled" />
            </div>
          </Container>
          <Link href="ResendEmail">{"Resend Email"}</Link>
          <br></br>
          <Button onClick={loginClick} variant="contained">
            Sign in!
          </Button>
        </Box>
      </header>
    </div>
  );
}

export default ForgotPassword;