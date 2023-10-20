import React, { useState } from 'react';
import './App.css';
import {Button, Box} from '@mui/material/';
import { Container, Link, TextField, Stack } from '@mui/material';
import ForgotPassword from './ForgotPassword';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';

function SignUp() {
    const auth = getAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    async function SignUp_Home(email: string, password: string) {
        try {
            createUserWithEmailAndPassword(auth, email, password);
            console.log("Success");
        } catch (error) {
           console.log("Uh-oh");
        }
    }
    const SignUp_Btn_Click = () => {
        SignUp_Home(email, password);
    }
    return (
        <div className="App" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <header className="App-header" style={{margin:2}}></header>
            <Box sx={{width: '62.5%', bgcolor:"#FBE9E9", alignItems: 'center', justifyContent: 'center', opacity: '50%'}}> 
                <h1>Sign Up</h1>
                <Stack spacing = {2}>
                    <div><TextField id="username" label="Create an username" variant="filled"/></div>
                    <div><TextField id="email_field" label="Enter your email" variant="filled" value={email} onChange={(e) => setEmail(e.target.value)}/></div>
                    <div><TextField id="password_field" label="Enter your password" variant="filled" value={password} onChange={(e) => setPassword(e.target.value)}/></div>
                </Stack>
                <Button onClick={SignUp_Btn_Click} variant="contained">Sign up!</Button>
            </Box>
            <h2>Test</h2>
        </div>
    );
}
export default SignUp;