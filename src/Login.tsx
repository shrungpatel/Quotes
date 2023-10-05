import React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { Container, Link, TextField, Stack, Alert } from '@mui/material';
import ForgotPassword from './ForgotPassword';
import { useNavigate } from "react-router-dom";
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
  }
  return (
    <div className="App">
      <header className="App-header">
        <Container maxWidth="sm">
          <h1>Login</h1>
          <Stack spacing = {2}>
          <div><TextField id="username" label="Username" variant="filled"/></div>
          <div><TextField id="password" label="Password" variant="filled"/></div>
          </Stack>
        </Container>
          <Link onClick = {forgotClick}>Forgot Password</Link>
          <Link onClick = {signup}>Create an account</Link>
          <Button onClick = {signin} variant="contained">Sign in</Button>
      </header>
    </div>
  );
}

export default Login;