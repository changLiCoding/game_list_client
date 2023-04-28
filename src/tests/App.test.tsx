import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import App from "@/App";
import Navbar from "@/components/Navbar/Navbar";

describe("App", () => {
  it("Renders App", () => {
    render(<App />);
  });
  it("Renders Navbar", () => {
    render(<Navbar />);
  });
});
