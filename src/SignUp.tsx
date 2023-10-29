import React, { useState } from 'react';
import './App.css';
import {Button, Box} from '@mui/material/';
import { Container, Link, TextField, Stack } from '@mui/material';
import Login from './Login';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';

function SignUp() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    async function SignUp_Home(email: string, password: string) {
        try {
            createUserWithEmailAndPassword(auth, email, password);
            navigate("/Login");
        } catch (error) {
           console.log("Uh-oh");
        }
    }
    const SignUp_Btn_Click = () => {
        SignUp_Home(email, password);
    }
    return (
        <div className="App">
            <header className="App-header">
            <Box className="App-box"> 
                <h1>Sign Up</h1>
                <Stack spacing = {2}>
                    <div><TextField id="username" label="Create an username" variant="filled"/></div>
                    <div><TextField id="email_field" label="Enter your email" variant="filled" value={email} onChange={(e) => setEmail(e.target.value)}/></div>
                    <div><TextField id="password_field" label="Enter your password" variant="filled" value={password} onChange={(e) => setPassword(e.target.value)}/></div>
                </Stack>
                <br></br>
                <Button onClick={SignUp_Btn_Click} variant="contained">Sign up!</Button>
            </Box>
            </header>
            <h2>Test</h2>
        </div>
    );
}
export default SignUp;