import { describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ContextWrapper from "../../ContextWrapper";
import Register from "../../pages/Register/Register";
import userEvent from "@testing-library/user-event";

const registerButtonName = "REGISTER";

describe("Register", () => {
  it("Fail to input necessary fields", async () => {
    render(
      <ContextWrapper>
        <Register />
      </ContextWrapper>
    );
    // Expect the following texts to be present when NO input is given
    const button = screen.getByRole("button", { name: registerButtonName });
    await userEvent.click(button);

    expect(screen.getByText("Please input your username!")).toBeInTheDocument();
    expect(screen.getByText("Please input your email!")).toBeInTheDocument();
    expect(screen.getByText("Please input your password!")).toBeInTheDocument();
    expect(
      screen.getByText("Please confirm your password!")
    ).toBeInTheDocument();

    // Expect the following texts to be present when ONLY email is given
    const email = screen.getByTestId("email-test");
    await userEvent.type(email, "v@gmail.com");
    await userEvent.click(button);

    const textEmail = screen.queryByText("Please input your email!");
    expect(textEmail).toBeNull();
    expect(screen.getByText("Please input your username!")).toBeInTheDocument();
    expect(screen.getByText("Please input your password!")).toBeInTheDocument();
    expect(
      screen.getByText("Please confirm your password!")
    ).toBeInTheDocument();

    // Expect the following texts to be present when ONLY username and email are given
    const username = screen.getByTestId("user-test");
    await userEvent.type(username, "legendary");
    await userEvent.click(button);

    const textUsername = screen.queryByText("Please input your username!");
    expect(textUsername).toBeNull();
    expect(screen.getByText("Please input your password!")).toBeInTheDocument();
    expect(
      screen.getByText("Please confirm your password!")
    ).toBeInTheDocument();

    // Expect "Password must be at least 8 characters long" when password is less than 8 characters
    const password = screen.getByTestId("password-test");
    await userEvent.type(password, "pass");
    await userEvent.click(button);

    expect(
      screen.getByText("Password must be at least 8 characters long")
    ).toBeInTheDocument();

    // Expect "The two passwords that you entered do not match!" when passwords are mismatched
    await userEvent.type(password, "password");
    const passwordConfirmation = screen.getByTestId(
      "password-confirmation-test"
    );
    await userEvent.type(passwordConfirmation, "passwor");
    await userEvent.click(button);

    expect(
      screen.getByText("The two passwords that you entered do not match!")
    ).toBeInTheDocument();
  });

  it("Fail to register a new user", () => {
    render(
      <ContextWrapper>
        <Register />
      </ContextWrapper>
    );
  });
});
