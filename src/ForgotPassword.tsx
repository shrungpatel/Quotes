import React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { Container, Link, TextField } from '@mui/material';
function ForgotPassword() {
  return (
    <div className="App">
      <header className="App-header">
        <Container maxWidth="sm">
          <h1>Forgot Password</h1>
          <div><TextField id="email" label="Enter your email" variant="filled"/></div>
        </Container>
        <Link href="ResendEmail">{'Resend Email'}</Link>
         <Button variant="contained">Sign in</Button>
        
      </header>
    </div>
  );
}

export default ForgotPassword;