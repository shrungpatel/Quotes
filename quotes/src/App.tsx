import { lazy, Suspense } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import {
  Box,
  AppBar,
  Button,
  Container,
  Toolbar,
} from "@mui/material";
import RouteLoader from "./components/RouteLoader";
import useLogout from "./hooks/useLogout";

const Login = lazy(() => import("./Login"));
const ForgotPassword = lazy(() => import("./ForgotPassword"));
const SignUp = lazy(() => import("./SignUp"));
const Dashboard = lazy(() => import("./Dashboard"));
const Saved = lazy(() => import("./Saved"));

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const logOut = useLogout();

  const goToDashboard = () => {
    navigate("/Dashboard");
  };
  const goToSaved = () => {
    navigate("/Saved");
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
                  {/* 1px solid #ccc for the search bar*/}
                  <input
                    className="App-seach"
                    type="search"
                    placeholder="Search here"
                    style={{
                      borderRadius: "20px",
                      border: "none",
                      padding: "8px",
                    }}
                  />
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
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Saved" element={<Saved />} />
        </Routes>
      </Suspense>
    </div>
  );
}
export default App;
