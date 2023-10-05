import React from 'react';
import './App.css';
import {Button, Box} from '@mui/material/';
import { Container, Link, TextField, Stack } from '@mui/material';
import ForgotPassword from './ForgotPassword';
import { useNavigate } from "react-router-dom";
function SignUp() {
    return (
        <div className="App">
            <Box sx={{width: '75%', bgcolor:"#FBE9E9", alignItems: 'center', justifyContent: 'center'}}> 
                <h1>Sign Up</h1>
                <Stack spacing = {2}>
                    <div><TextField id="username" label="Create an username" variant="filled"/></div>
                    <div><TextField id="email" label="Enter your email" variant="filled"/></div>
                    <div><TextField id="password" label="Enter your password" variant="filled"/></div>
                </Stack>
            </Box>
            <h2>Test</h2>
        </div>
    );
}
export default SignUp;