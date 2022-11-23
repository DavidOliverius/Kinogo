import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import axios from "axios";

const mockSignUp = jest.fn();
let mockErrorMessage = "";

jest.mock("axios", () => jest.fn(() => Promise.resolve("teresa teng")));
jest.mock("../auth/auth-provider", () => ({
  useAuth: () => ({
    signUp: mockSignUp,
    error: mockErrorMessage,
  }),
}));

describe("SignUpForm", () => {
  afterEach(jest.resetAllMocks);

  it("renders", () => {
    render(<SignUpForm />, {
      wrapper: BrowserRouter,
    });

    expect(screen.getByRole("button")).toHaveTextContent("Sign Up");
    expect(screen.getByRole("heading")).toHaveTextContent("Sign up");
    expect(
      screen.getByText("Already have an account? Sign in")
    ).toBeInTheDocument();
  });

  it("submits email, password and username when button is pressed", () => {
    render(<SignUpForm />, {
      wrapper: BrowserRouter,
    });

    const emailEl = screen.getByLabelText("Email Address *");
    const passwordEl = screen.getByLabelText("Password *");
    const usernameEl = screen.getByLabelText("Username *");
    const submitButton = screen.getByRole("button");

    userEvent.type(emailEl, "test@test.com");
    userEvent.type(passwordEl, "testpassword");
    userEvent.type(usernameEl, "testusername");
    userEvent.click(submitButton);

    expect(mockSignUp).toHaveBeenCalledWith({
      email: "test@test.com",
      password: "testpassword",
      displayName: "testusername",
    });
  });

  it("renders Error message", () => {
    mockErrorMessage = "Oops Somthing went wrong";
    render(<SignUpForm />, {
      wrapper: BrowserRouter,
    });

    expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
  });
});
