import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MovieCarousel from "./MovieCarousel";

describe("MovieCarousel", () => {
  it("renders with carousel title", () => {
    render(<MovieCarousel movies={[]} carouselTitle="test title" />, {
      wrapper: BrowserRouter,
    });

    expect(screen.getByText("test title")).toBeInTheDocument();
  });

  it("renders Spinner if no movies are present", () => {
    render(<MovieCarousel movies={undefined} />, {
      wrapper: BrowserRouter,
    });

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
