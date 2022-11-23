import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import SignInForm from "./SignInForm";
import axios from "axios";

const mockSignIn = jest.fn();
let mockErrorMessage = "";

jest.mock("axios", () => jest.fn(() => Promise.resolve("teresa teng")));
jest.mock("../auth/auth-provider", () => ({
  useAuth: () => ({
    signIn: mockSignIn,
    error: mockErrorMessage,
  }),
}));

describe("SignInForm", () => {
  afterEach(jest.resetAllMocks);

  it("renders", () => {
    render(<SignInForm />, {
      wrapper: BrowserRouter,
    });

    expect(screen.getByRole("button")).toHaveTextContent("Sign In");
    expect(screen.getByRole("heading")).toHaveTextContent("Sign in");
    expect(
      screen.getByText("Don't have an account? Sign Up")
    ).toBeInTheDocument();
  });

  it("submits email and password when button is pressed", () => {
    render(<SignInForm />, {
      wrapper: BrowserRouter,
    });

    const emailEl = screen.getByLabelText("Email Address *");
    const passwordEl = screen.getByLabelText("Password *");
    const submitButton = screen.getByRole("button");

    userEvent.type(emailEl, "test@test.com");
    userEvent.type(passwordEl, "testpassword");
    userEvent.click(submitButton);

    expect(mockSignIn).toHaveBeenCalledWith({
      email: "test@test.com",
      password: "testpassword",
    });
  });

  it("renders Error message", () => {
    mockErrorMessage = "Oops Somthing went wrong";
    render(<SignInForm />, {
      wrapper: BrowserRouter,
    });

    expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
  });
});
