import React from "react";
import SignInForm from "../components/SignInForm";

const SignIn = () => {
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
      <SignInForm />
    </div>
  );
};
export default SignIn;
