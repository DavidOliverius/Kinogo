import React from "react";
import SignUpForm from "../components/SignUpForm";

const SignUp = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SignUpForm />
    </div>
  );
};

export default SignUp;
