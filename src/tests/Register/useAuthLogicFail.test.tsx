import { renderHook } from "@testing-library/react";
import useAuth from "../../services/authentication/useAuth";
import { vi } from "vitest";

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
              errors: ["Email is already taken"],
            },
          },
        })),
        { loading: false, error: false },
      ];
    }),
  };
});

describe("Register logic in useAuth", () => {
  it("Fail to register with these credentials", async () => {
    const { result } = renderHook(() => useAuth());

    const userData = await result.current.register(
      "Meee",
      import.meta.env.VITE_USER_EMAIL_TEST,
      "password2"
    );

    expect(userData.errors[0]).toEqual("Email is already taken");
  });
});
