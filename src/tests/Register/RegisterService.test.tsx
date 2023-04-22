// import authentication from "../../services/authentication";

import { renderHook } from "@testing-library/react";
import useAuth from "../../services/authentication/useAuth";

describe("Register Service", () => {
  it("Successful send register request", async () => {});

  it("Fail login credentials request", async () => {
    const { result } = renderHook(() => useAuth());
    const userData = await result.current.register(
      "Meee",
      import.meta.env.VITE_USER_EMAIL_TEST,
      "password2"
    );
    expect(userData.errors[0]).toEqual("Email is already taken");
  });
});
