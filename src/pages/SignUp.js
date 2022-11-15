import React from "react";
import SignUpForm from "../components/SignUpForm";
import { Typography, Container } from "@mui/material";

const SignUp = () => {
  return (
    <Container>
      <Typography variant="h4">Sign up now to get started today!</Typography>
      <Typography variant="h6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore
      </Typography>
      <SignUpForm />
    </Container>
  );
};

export default SignUp;
