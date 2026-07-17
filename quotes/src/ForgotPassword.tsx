import React, { useEffect, useState } from "react";
import "./App.css";
import { Button, Box } from "@mui/material/";
import { Container, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const loginClick = () => {
    navigate("/Login");
  };

  async function sendPasswordResetEmail() {
    const trimmedEmail = email.trim();
    setMessage(null);
    setError(null);

    if (!trimmedEmail) {
      setError("Email is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error ?? "Unable to send password reset email.");
      }

      setMessage(data?.message ?? "Password reset email sent.");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Unable to send password reset email.");
    } finally {
      setLoading(false);
    }
  }

  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      void sendPasswordResetEmail();
    }
  };

  useEffect(() => {
    document.title = "Forgot Password";
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <Box className="App-box">
          <Button sx={{ position: "absolute", top: 25, left: 25 }} onClick={loginClick}>
              &larr; {/* left arrow */}
          </Button>
          <Container maxWidth="sm">
            <h1>Forgot Password</h1>
            <Stack spacing={2}>
              <div>
                <TextField
                  id="email"
                  label="Enter your email"
                  variant="filled"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onKeyDown={handleEnterKey}
                />
              </div>
              {message && <p style={{ color: "green" }}>{message}</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}
            </Stack>
          </Container>
          <br></br>
          <Button
            variant="contained"
            disabled={loading}
            onClick={() => void sendPasswordResetEmail()}
          >
            {loading ? "Sending..." : "Send Email"}
          </Button>
        </Box>
      </header>
    </div>
  );
}

export default ForgotPassword;
