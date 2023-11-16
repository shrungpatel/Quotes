import React, { useEffect, useState } from 'react';
import './App.css';
import {Button, Box, Alert} from '@mui/material/';
import { Container, Link, TextField, Stack } from '@mui/material';
import Login from './Login';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';
import { setDefaultEventParameters } from 'firebase/analytics';
import { firestore } from './Firebase';
import { doc, setDoc } from 'firebase/firestore';

function SignUp() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    async function SignUp_Home(email: string, password: string) {
        try {
            const userCredential = createUserWithEmailAndPassword(auth, email, password);
            const user = (await userCredential).user;
            const docRef = doc(firestore, "Users", email);
            const data = {
                uid: user.uid,
                email: email,
                password: password,
                quotesID: null
            }
        
            console.log(data.uid);
            await setDoc(docRef, data);
            //navigate("/Login");
        } catch (error: any) {
            if(error.code == "auth/email-already-exists") {
                alert("This email is already in use.")
            }
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
                    <div><TextField id="username" label="Your name" variant="filled" value={name} onChange={(e) => setName(e.target.value)}/></div>
                    <div><TextField id="email_field" label="Enter your email" variant="filled" value={email} onChange={(e) => setEmail(e.target.value)}/></div>
                    <div><TextField id="password_field" label="Enter your password" variant="filled" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/></div>
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

function setShow(arg0: boolean) {
        throw new Error('Function not implemented.');
    }