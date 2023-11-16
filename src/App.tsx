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
} from "@mui/material";
import { ref } from "firebase/storage";
//put header in a seperate file and them import that
function App() {
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  const hideHeader =
    location.pathname === "/" ||
    location.pathname === "/Login" ||
    location.pathname === "/SignUp" ||
    location.pathname === "/ForgotPassword" ? null : (
      <Box sx={{ pb: 7 }} ref={ref}>
        <Paper className="App-menu-bar" elevation={10}>
          <BottomNavigation
            showLabels
            value={value}          
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Recents" />
            <BottomNavigationAction label="Favorites" />
            <BottomNavigationAction label="Nearby" />
          </BottomNavigation>
        </Paper>
      </Box>
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
