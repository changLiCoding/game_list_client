import { describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Login from "../../pages/Login/Login";
import ContextWrapper from "../../ContextWrapper";

describe("Login", () => {
  it("Renders login", () => {
    render(
      <ContextWrapper>
        <Login />
      </ContextWrapper>
    );

    // Expect the following texts to be present
    expect(screen.getByText("Welcome back")).toBeInTheDocument();
    expect(screen.getByText("Login to the Dashboard")).toBeInTheDocument();

    // Expect all input fields (including Email and Password) to be present
    const inputEmail = screen.getByPlaceholderText("Email");
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByPlaceholderText("Password");
    expect(inputPassword).toBeInTheDocument();
  });
});
