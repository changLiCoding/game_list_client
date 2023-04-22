import { describe, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Login from "../../pages/Login/Login";
import ContextWrapper from "../../ContextWrapper";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";

// Mock function to run Login
// vi.mock("../../services/authentication", async () => {
//   const actual: any = await vi.importActual("../../services/authentication");
//   return {
//     ...actual,
//     login: vi.fn(),
//   };
// });

vi.mock("../../graphql", async () => {
  const actual: any = await vi.importActual("../../graphql");
  return {
    ...actual,
    apolloClient: {
      query: vi.fn(),
      mutate: vi.fn().mockReturnValue({
        data: {
          login: {
            user: {
              username: "MyName",
            },
            errors: [],
          },
        },
      }),
    },
  };
});

describe("Login", () => {
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
    await userEvent.type(email, import.meta.env.VITE_USER_EMAIL_TEST);
    await userEvent.click(button);

    const textEmail = screen.queryByText("Please input your email!");
    expect(textEmail).toBeNull();
    expect(screen.getByText("Please input your password!")).toBeInTheDocument();
  });

  it.only("Fail to login due to credential", async () => {
    const { container } = render(
      <ContextWrapper>
        <Login />
      </ContextWrapper>
    );
    const button = screen.getByRole("button", { name: "LOGIN" });
    const email = screen.getByTestId("email-test");
    await userEvent.type(email, import.meta.env.VITE_USER_EMAIL_TEST);
    const password = screen.getByTestId("password-test");
    await userEvent.type(password, "password");
    await userEvent.click(button);

    // Check if the icon inside the error message appeared
    const allImg = screen.queryAllByRole("img");
    const node = allImg[allImg.length - 1];

    expect(node?.classList[1]).toBe("anticon-info-circle");
  });
});
