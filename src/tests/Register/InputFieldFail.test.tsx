import { describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ContextWrapper from "../../ContextWrapper";
import Register from "../../pages/Register/Register";
import userEvent from "@testing-library/user-event";

const registerButtonName = "REGISTER";

// vi.mock("../../graphql", async () => {
//   const actual: any = await vi.importActual("../../graphql");
//   return {
//     ...actual,
//     apolloClient: {
//       query: vi.fn(),
//       mutate: vi.fn().mockReturnValue({
//         data: {
//           register: {
//             user: {
//               username: "MyName",
//             },
//             errors: [],
//           },
//         },
//       }),
//     },
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
            register: {
              user: {
                username: null,
              },
              errors: [],
            },
          },
        })),
        { loading: false, error: false },
      ];
    }),
  };
});

describe("Register Input Fields", () => {
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
    await userEvent.type(email, import.meta.env.VITE_USER_EMAIL_TEST);
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
    await userEvent.type(passwordConfirmation, "pass");
    await userEvent.click(button);

    expect(
      screen.getByText("The two passwords that you entered do not match!")
    ).toBeInTheDocument();
  });

  it("Fail to register a new user with existing email in database", async () => {
    render(
      <ContextWrapper>
        <Register />
      </ContextWrapper>
    );
    const button = screen.getByRole("button", { name: "REGISTER" });
    const username = screen.getByTestId("user-test");
    await userEvent.type(username, "Vv");
    const email = screen.getByTestId("email-test");
    await userEvent.type(email, import.meta.env.VITE_USER_EMAIL_TEST);
    const password = screen.getByTestId("password-test");
    await userEvent.type(password, "password2");
    const passwordConfirmation = screen.getByTestId(
      "password-confirmation-test"
    );
    await userEvent.type(passwordConfirmation, "password2");

    await userEvent.click(button);

    // Check if the icon inside the error message appeared
    const allImg = screen.queryAllByRole("img");
    const node = allImg[allImg.length - 1];

    expect(node?.classList[1]).toBe("anticon-info-circle");
  });
});
