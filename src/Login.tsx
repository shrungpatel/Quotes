import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import { Container, Link, TextField, Stack, Alert, } from "@mui/material";
import ForgotPassword from "./ForgotPassword";
import { useNavigate } from "react-router-dom";
import { db } from "./Firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
function Login() {
  const navigate = useNavigate();
  const forgotClick = () => {
    navigate("/ForgotPassword");
  };
  const signup = () => {
    const auth = getAuth();
    // firebase.auth().createUserWithEmailAndPassword("test@email.com", "password");
    navigate("/SignUp");
  };
  const signin = () => {
    navigate("/Dashboard");
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
  };
  // getLogin();


  const auth = getAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    async function SignIn_Home(email: string, password: string) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Success");
            navigate("/Saved");
        } catch (error: any) {
          if(error.code === "auth/user-not-found") {
            alert("User not found");
            console.log("Invalid user");
          }
          if(error.code === "auth/invalid-email") {
            alert("Email not found");
            console.log("Invalid email");
          }
          if(error.code === "auth/invalid-login-credentials") {
            alert("Invalid login credentials");
            console.log("Invalid email");
          }
           console.log(error.code);
        }
    }
    const SignIn_Btn_Click = () => {
        SignIn_Home(email, password);
    }


  return (
    <div className="App">
      <header className="App-header">
        <Container className="App-box">
          <Container maxWidth="sm">
            <h1>Login</h1>
            <Stack spacing={2}>
              <div>
                <TextField id="email" label="Email" variant="filled" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div>
                <TextField id="password" label="Password" variant="filled" value={password} type="password" onChange={(e) => setPassword(e.target.value)}/>
              </div>
            </Stack>
          </Container>
          <div>
          <Link onClick={forgotClick}>Forgot Password</Link>
          <br></br>
          <Link onClick={signup}>Create an account</Link>
          </div>
          <Button onClick={SignIn_Btn_Click} variant="contained" className="App-button">Sign in</Button>
        </Container>
      </header>
    </div>
  );
}

export default Login;