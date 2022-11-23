import React from "react";
import { render, screen } from "@testing-library/react";
import Banner from "./Banner";
import { BrowserRouter } from "react-router-dom";

describe("Banner", () => {
  it("renders Banner with movie title", () => {
    render(<Banner movie={{ title: "test title" }} />, {
      wrapper: BrowserRouter,
    });

    expect(screen.getByText("test title")).toBeInTheDocument();
  });

  it("renders Spinner when there is no movie title", () => {
    render(<Banner />, {
      wrapper: BrowserRouter,
    });

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
