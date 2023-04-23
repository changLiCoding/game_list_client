import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import Dashboard from "../pages/Dashboard/Dashboard";
import Navbar from "../components/Navbar/Navbar";

describe("App", () => {
  it("Renders App", () => {
    render(<App />);
  });
  it("Renders Dashboard", () => {
    render(<Dashboard />);
  });
  it("Renders Navbar", () => {
    render(<Navbar />);
  });
});
