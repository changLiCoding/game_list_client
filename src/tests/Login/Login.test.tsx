import { describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Login from "../../pages/Login/Login";
import ContextWrapper from "../../ContextWrapper";
import userEvent from "@testing-library/user-event";

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

  it("Fail to input necessary fields", async () => {
    render(
      <ContextWrapper>
        <Login />
      </ContextWrapper>
    );

    // Expect the following texts to be present when NO input is given
    const button = screen.getByRole("button", { name: "LOGIN" });
    await userEvent.click(button);

    expect(screen.getByText("Please input your email!")).toBeInTheDocument();
    expect(screen.getByText("Please input your password!")).toBeInTheDocument();

    // Expect the following texts to be present when ONLY email is given
    const email = screen.getByTestId("email-test");
    await userEvent.type(email, "v@gmail.com");
    await userEvent.click(button);

    const textEmail = screen.queryByText("Please input your email!");
    expect(textEmail).toBeNull();
    expect(screen.getByText("Please input your password!")).toBeInTheDocument();
  });

  it("Fail to login due to credential", () => {
    render(
      <ContextWrapper>
        <Login />
      </ContextWrapper>
    );
  });

  it("Successfully login", () => {
    render(
      <ContextWrapper>
        <Login />
      </ContextWrapper>
    );
  });
});
