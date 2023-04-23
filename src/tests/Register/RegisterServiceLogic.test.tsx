// import authentication from "../../services/authentication";

import { renderHook } from "@testing-library/react";
import useAuth from "../../services/authentication/useAuth";
import { v4 as uuidv4 } from "uuid";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  useMutation,
} from "@apollo/client";
import { REGISTER } from "../../services/authentication/queries";
import { vi } from "vitest";
import { options } from "yargs";
import { setContext } from "@apollo/client/link/context";

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem("token");

//   return token
//     ? { headers: { ...headers, authorization: `Bearer ${token}` } }
//     : headers;
// });

// const httpLink = new HttpLink({
//   uri: import.meta.env.VITE_BACKEND,
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
                username: "Meee",
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

  it.only("Fail to register with these credentials", async () => {
    const { result } = renderHook(() => useAuth());

    // const request = resultRegistration.current[0];
    // const result = request({
    //   variables: {
    //     username: "Meee",
    //     email: import.meta.env.VITE_USER_EMAIL_TEST,
    //     password: "password2",
    //   },
    // });

    const userData = await result.current.register(
      "Meee",
      import.meta.env.VITE_USER_EMAIL_TEST,
      "password2"
    );
    expect(userData.errors[0]).toEqual("Email is already taken");

    // WORKING. ONLY NEED TO DO ASSERT
    // const { result: resultRegistration } = renderHook(() =>
    //   useMutation(REGISTER, {
    //     client: new ApolloClient({
    //       link: authLink.concat(httpLink),
    //       cache: new InMemoryCache(),
    //     }),
    //   })
    // );
    // console.log(
    //   await resultRegistration.current[0]({
    //     variables: {
    //       username: "Meee",
    //       email: import.meta.env.VITE_USER_EMAIL_TEST,
    //       password: "password2",
    //     },
    //   })
    // );
  });
});
