import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MovieCard from "./MovieCard";

const testMovie = {
  id: "test id",
  title: "test title",
  poster_path: "test path",
  release_date: "Mar 22",
};

describe("MovieCard", () => {
  it("renders MovieCard with movie title", () => {
    render(<MovieCard movie={testMovie} />, {
      wrapper: BrowserRouter,
    });

    expect(
      screen.getByText("test title", { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByText("Mar", { exact: false })).toBeInTheDocument();
    expect(screen.getByAltText("test title")).toBeInTheDocument();
  });
});
