import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Error from "./pages/Error";
import SignIn from "./pages/SignIn";
import MovieDetail from "./components/MovieDetail";
import Profile from "./pages/Profile";
import { useAuth } from "./auth/auth-provider";

const App = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Container
      sx={{ height: "calc(100vh - 68.5px)" }}
      maxWidth={false}
      disableGutters
    >
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="sign-up"
          element={isLoggedIn ? <Navigate replace to="/" /> : <SignUp />}
        />
        <Route
          path="sign-in"
          element={isLoggedIn ? <Navigate replace to="/" /> : <SignIn />}
        />
        <Route path="id/:id" element={<MovieDetail />} />
        <Route
          path="profile"
          element={isLoggedIn ? <Profile /> : <Navigate replace to="/" />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </Container>
  );
};

export default App;
