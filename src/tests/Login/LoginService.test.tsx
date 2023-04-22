import { renderHook } from "@testing-library/react";
import useAuth from "../../services/authentication/useAuth";

describe("Login Service", () => {
  it("Successful send login request", async () => {
    const { result } = renderHook(() => useAuth());
    const userData = await result.current.login(
      import.meta.env.VITE_USER_EMAIL_TEST,
      import.meta.env.VITE_PASSWORD_TEST
    );

    // expect(userData).toMatchInlineSnapshot(`
    //   {
    //     "__typename": "LoginUserPayload",
    //     "errors": [],
    //     "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyNiwiZXhwIjoxNjg0NzY4MzY3fQ.6uVvI-_rsmhLdHcP86LNjiVHziBwb_uyUCcejfcEk6k",
    //     "user": {
    //       "__typename": "User",
    //       "username": "Viet",
    //     },
    //   }
    // `);

    expect(userData.user).toEqual({
      __typename: "User",
      username: "Vv",
    });
  });

  it("Fail login credentials request", async () => {
    const { result } = renderHook(() => useAuth());
    const userData = await result.current.login(
      import.meta.env.VITE_USER_EMAIL_TEST,
      "password2"
    );
    expect(userData.errors[0]).toEqual("Invalid email or password");
  });
});
