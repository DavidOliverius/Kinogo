import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Error from "./pages/Error";
import SignIn from "./pages/SignIn";
import MovieDetail from "./components/MovieDetail";

const App = () => {
  return (
    <Container
      sx={{ height: "calc(100vh - 68.5px)" }}
      maxWidth={false}
      disableGutters
    >
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="id/:id" element={<MovieDetail />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Container>
  );
};

export default App;
