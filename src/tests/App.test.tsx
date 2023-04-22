import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import Dashboard from "../pages/Dashboard/Dashboard";

describe("App", () => {
  it("Renders App", () => {
    render(<App />);
  });
  it("Renders Dashboard", () => {
    render(<Dashboard />);
  });
});
