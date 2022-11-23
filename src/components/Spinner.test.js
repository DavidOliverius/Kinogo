import React from "react";
import { render } from "@testing-library/react";
import Spinner from "./Spinner";

describe("Spinner", () => {
  it("renders", () => {
    render(<Spinner />);
  });
});
