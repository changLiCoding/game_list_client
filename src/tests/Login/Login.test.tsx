import { describe, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Login from "../../pages/Login/Login";
import ContextWrapper from "../../ContextWrapper";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";

// vi.mock("../../services/authentication/useAuth", async () => {
//   const actual: any = await vi.importActual(
//     "../../services/authentication/useAuth"
//   );
//   return {
//     ...actual,
//     useAuth: vi.fn(),
//   };
// });

vi.mock("@apollo/client", async () => {
  const actual: any = await vi.importActual("@apollo/client");
  return {
    ...actual,
    useMutation: vi.fn(() => {
      return [
        vi.fn(() => ({
          data: {
            login: {
              user: {
                username: "Vv",
              },
              token: "token",
              errors: [],
            },
          },
        })),
        { loading: false, error: false },
      ];
    }),
  };
});

vi.mock("react-router-dom", async () => {
  const actual: any = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn().mockReturnValue((value: string) => value),
  };
});

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

  it("Successfully login", async () => {
    const navigate = useNavigate();

    render(
      <ContextWrapper>
        <Login />
      </ContextWrapper>
    );

    const button = screen.getByRole("button", { name: "LOGIN" });
    const email = screen.getByTestId("email-test");
    await userEvent.type(email, import.meta.env.VITE_USER_EMAIL_TEST);
    const password = screen.getByTestId("password-test");
    await userEvent.type(password, import.meta.env.VITE_PASSWORD_TEST);
    await userEvent.click(button);

    const textEmail = screen.queryByText("Please input your email!");
    expect(textEmail).toBeNull();

    const textPassword = screen.queryByText("Please input your password!");
    expect(textPassword).toBeNull();

    expect(navigate("/dashboard")).toBe("/dashboard");
  });
});
