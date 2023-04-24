import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import Dashboard from "../pages/Dashboard/Dashboard";
import Navbar from "../components/Navbar/Navbar";
import Router from "../Router";
import ContextWrapper from "../ContextWrapper";

describe("App", () => {
  it("Renders App", () => {
    render(<App />);
  });
  it("Renders Router", () => {
    render(
      <ContextWrapper>
        <Router />
      </ContextWrapper>
    );
  });
  it("Renders Dashboard", () => {
    render(
      <ContextWrapper>
        <Dashboard />
      </ContextWrapper>
    );
  });
  it("Renders Navbar", () => {
    render(<Navbar />);
  });
});
