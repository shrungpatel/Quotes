import React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { Container, Link, TextField } from '@mui/material';
import ForgotPassword from './ForgotPassword';
function Login() {
  return (
    <div className="App">
      <header className="App-header">
        <Container maxWidth="sm">
          <h1>Login</h1>
          <div><TextField id="username" label="Username" variant="filled"/></div>
          <div><TextField id="password" label="Password" variant="filled"/></div>
        </Container>
          <Link href="ForgotPassword">Forgot Password</Link>
          <Button variant="contained">Sign in</Button>
      </header>
    </div>
  );
}

export default Login;