import React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Routes,
  Route,
  useNavigate,
  BrowserRouter,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import Saved from "./Saved";
import {
  Box,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Fade,
  useScrollTrigger,
  Fab,
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { ref } from "firebase/storage";
//put header in a seperate file and them import that
function App() {
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const goToDashboard = () => {
    navigate("/Dashboard");
  };
  const goToSaved = () => {
    navigate("/Saved");
  };
  const logOut = () => {
    navigate("/Login");
  };
  const hideHeader =
    location.pathname === "/" ||
    location.pathname === "/Login" ||
    location.pathname === "/SignUp" ||
    location.pathname === "/ForgotPassword" ? null : (
      <>
        <Box>
          <AppBar
            className="App-menu-bar-background"
            position="fixed"
            component="nav"
          >
            <Container>
              <Toolbar disableGutters>
                <Toolbar />
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  <Button
                    className="App-menu-bar-text"
                    key={"dashboard"}
                    onClick={goToDashboard}
                    sx={{ my: 2, color: "white", flexGrow: 1 }}
                  >
                    Dashboard
                  </Button>
                  <Button
                    className="App-menu-bar-text"
                    key={"saved"}
                    onClick={goToSaved}
                    sx={{ my: 2, color: "white", flexGrow: 1 }}
                  >
                    Saved
                  </Button>

                  <input className="App-seach" type="search" placeholder="Search here" />
                  <Button
                    className="App-menu-bar-text"
                    key={"logout"}
                    onClick={logOut}
                    sx={{ my: 2, color: "white", flexGrow: 1 }}
                  >
                    Log out
                  </Button>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
          <Toolbar />
        </Box>
      </>
    );

  return (
    <div className="App">
      {hideHeader}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Saved" element={<Saved />} />
      </Routes>
    </div>
  );
}
export default App;
