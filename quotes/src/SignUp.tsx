import React, { useEffect, useState } from "react";
import "./App.css";
import { Button, Box } from "@mui/material/";
import { TextField, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";
import { createUserProfile } from "./services/userProfileService";

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      SignUp_Home(email, password);
    }
  };

  useEffect(() => {
    document.title = "Sign Up";
  }, []);

  async function SignUp_Home(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      await createUserProfile(user.uid, email, name);
      navigate("/Login");
    } catch (error: unknown) {
      const code =
        typeof error === "object" && error !== null && "code" in error
          ? String((error as { code?: unknown }).code)
          : undefined;

      if (code === "auth/email-already-in-use") {
        alert("This email is already in use.");
      }
      console.log("Uh-oh", error);
    }
  }
  const SignUp_Btn_Click = () => {
    SignUp_Home(email, password);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Box className="App-box">
          <h1>Sign Up</h1>
          <Stack spacing={2}>
            <div>
              <TextField
                id="username"
                label="Your name"
                variant="filled"
                value={name}
                onKeyDown={handleEnterKey}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <TextField
                id="email_field"
                label="Enter your email"
                variant="filled"
                value={email}
                onKeyDown={handleEnterKey}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <TextField
                id="password_field"
                label="Enter your password"
                variant="filled"
                type="password"
                value={password}
                onKeyDown={handleEnterKey}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </Stack>
          <br></br>
          <Button onClick={SignUp_Btn_Click} variant="contained">
            Sign up!
          </Button>
        </Box>
      </header>
    </div>
  );
}
export default SignUp;
