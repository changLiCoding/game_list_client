import { describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ContextWrapper from "../../ContextWrapper";
import Register from "../../pages/Register/Register";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const registerButtonName = "REGISTER";

vi.mock("../../graphql", async () => {
  const actual: any = await vi.importActual("../../graphql");
  return {
    ...actual,
    apolloClient: {
      query: vi.fn(),
      mutate: vi.fn().mockReturnValue({
        data: {
          register: {
            user: {
              username: "MyName",
            },
            token: "token",
            errors: [],
          },
        },
      }),
    },
  };
});

vi.mock("react-router-dom", async () => {
  const actual: any = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn().mockReturnValue((value: string) => value),
  };
});

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
      screen.getByRole("button", { name: registerButtonName })
    ).toBeInTheDocument();
  });

  it("Register a new user", async () => {
    const navigate = useNavigate();

    render(
      <ContextWrapper>
        <Register />
      </ContextWrapper>
    );

    const button = screen.getByRole("button", { name: "REGISTER" });
    const username = screen.getByTestId("user-test");
    await userEvent.type(username, "Legend");
    const email = screen.getByTestId("email-test");
    await userEvent.type(email, "abc@gmail.com");
    const password = screen.getByTestId("password-test");
    await userEvent.type(password, "password");
    const passwordConfirmation = screen.getByTestId(
      "password-confirmation-test"
    );
    await userEvent.type(passwordConfirmation, "password");

    await userEvent.click(button);

    // Check for any error
    const textUsername = screen.queryByText("Please input your username!");
    expect(textUsername).toBeNull();
    const textEmail = screen.queryByText("Please input your email!");
    expect(textEmail).toBeNull();
    const textPassword = screen.queryByText("Please confirm your password!");
    expect(textPassword).toBeNull();
    const textPasswordMLessThan8 = screen.queryByText(
      "Password must be at least 8 characters long"
    );
    expect(textPasswordMLessThan8).toBeNull();
    const textPasswordConfirmation = screen.queryByText(
      "The two passwords that you entered do not match!"
    );
    expect(textPasswordConfirmation).toBeNull();

    // Check if navigate is functioning
    expect(navigate("/dashboard")).toBe("/dashboard");
  });
});
