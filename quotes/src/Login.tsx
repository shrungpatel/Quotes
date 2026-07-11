import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import { Link, TextField, Stack, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const forgotClick = () => {
    navigate("/ForgotPassword");
  };

  const signup = () => {
    navigate("/SignUp");
  };

  const signin = () => {
    navigate("/Dashboard");
  };

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function SignIn_Home(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Success");
      navigate("/Dashboard");
    } catch (error: unknown) {
      const code =
        typeof error === "object" && error !== null && "code" in error
          ? String((error as { code?: unknown }).code)
          : undefined;
      
      if (code === "auth/user-not-found") {
        setError("User not found");
      }
      if (code === "auth/invalid-email") {
        setError("Email not found");
      }
      if (code === "auth/invalid-login-credentials") {
        setError("Invalid login credentials");
      }
    }
  }
  const SignIn_Btn_Click = () => {
    SignIn_Home(email, password);
  };

  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      SignIn_Home(email, password);
    }
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div className="App">
      <title>Login</title>
      <header className="App-header">
        <Box className="App-box">
          <h1>Login</h1>
          <Stack spacing={2}>
            <div>
              <TextField
                id="email"
                label="Email"
                variant="filled"
                value={email}
                onKeyDown={handleEnterKey}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <TextField
                id="password"
                label="Password"
                variant="filled"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleEnterKey}
              />
            </div>
          </Stack>

          <div>
            <Link className="App-link" onClick={forgotClick}>
              Forgot Password
            </Link>
            <br></br>
            <Link onClick={signup}>Create an account</Link>
          </div>
          <Button
            onClick={SignIn_Btn_Click}
            variant="contained"
            className="App-button"
          >
            Sign in
          </Button>
          <br></br>
          <Button onClick={signin} variant="contained" className="App-button">
            Continue as a guest
          </Button>
          <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </Box>
      </header>
    </div>
  );
}

export default Login;
