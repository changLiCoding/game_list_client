// import authentication from "../../services/authentication";

import { renderHook } from "@testing-library/react";
import useAuth from "../../services/authentication/useAuth";
import { v4 as uuidv4 } from "uuid";

describe("Register Service", () => {
  it("Successful send register request", async () => {
    const { result } = renderHook(() => useAuth());
    const username = uuidv4();
    const userData = await result.current.register(
      username,
      username + "@gmail.com",
      "password"
    );
    expect(userData?.user?.username).toEqual(username);
  });

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
