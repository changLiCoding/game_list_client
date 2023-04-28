import { act, renderHook } from "@testing-library/react";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  useMutation,
} from "@apollo/client";
import { LOGIN } from "@/services/authentication/queries";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_BACKEND,
});

describe("Login Service", () => {
  it("Successful send login request", async () => {
    const { result: resultLogin } = renderHook(() =>
      useMutation(LOGIN, {
        client: new ApolloClient({
          link: httpLink,
          cache: new InMemoryCache(),
        }),
      })
    );
    try {
      await act(async () => {
        const userData = await resultLogin.current[0]({
          variables: {
            email: import.meta.env.VITE_USER_EMAIL_TEST,
            password: import.meta.env.VITE_PASSWORD_TEST,
          },
        });
        expect(userData.data.login.user).toEqual({
          __typename: "User",
          username: "Vv",
        });
      });
    } catch (e: any) {
      expect(e.message).toEqual("Invalid email or password");
    }
  });

  it("Fail login credentials request", async () => {
    const { result: resultLogin } = renderHook(() =>
      useMutation(LOGIN, {
        client: new ApolloClient({
          link: httpLink,
          cache: new InMemoryCache(),
        }),
      })
    );
    try {
      await act(async () => {
        const userData = await resultLogin.current[0]({
          variables: {
            email: import.meta.env.VITE_USER_EMAIL_TEST,
            password: "password2",
          },
        });
        expect(userData.data.login.user).toEqual({
          __typename: "User",
          username: "Vv",
        });
      });
    } catch (e: any) {
      expect(e.message).toEqual("Invalid email or password");
    }
  });
});
