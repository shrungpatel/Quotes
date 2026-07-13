import { useEffect } from "react";
import "./App.css";
import { Button, Box } from "@mui/material/";
import { Container, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const loginClick = () => {
    navigate("/Login");
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
            <div>
              <TextField id="email" label="Enter your email" variant="filled" />
            </div>
          </Container>
          <br></br>
          <Button variant="contained">Send Email</Button>
        </Box>
      </header>
    </div>
  );
}

export default ForgotPassword;
