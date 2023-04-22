import { describe, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import ContextWrapper from "../../ContextWrapper";
import Register from "../../pages/Register/Register";

describe("Register", () => {
  it("Renders registration", () => {
    render(
      <ContextWrapper>
        <Register />
      </ContextWrapper>
    );

    // Expect Register word to be present
    const registerElements = screen.queryAllByText("Register");
    expect(registerElements.length).toBeGreaterThan(0);

    // Expect "Please fill in the form below" to be present
    expect(
      screen.getByText("Please fill in the form below")
    ).toBeInTheDocument();

    // Expect all input fields (including Username, Email, Password, and Password Confirmation) to be present
    const inputUsername = screen.getByPlaceholderText("Username");
    expect(inputUsername).toBeInTheDocument();

    const inputEmail = screen.getByPlaceholderText("Email");
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByPlaceholderText("Password");
    expect(inputPassword).toBeInTheDocument();

    const inputPasswordConfirmation = screen.getByPlaceholderText(
      "Password Confirmation"
    );
    expect(inputPasswordConfirmation).toBeInTheDocument();

    // Expect Register button to be present
    expect(
      screen.getByRole("button", { name: "Register" })
    ).toBeInTheDocument();
  });

  it("Register a new user", () => {
    render(
      <ContextWrapper>
        <Register />
      </ContextWrapper>
    );
  });
});
