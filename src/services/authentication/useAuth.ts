import { useState } from "react";
import { apolloClient } from "../../graphql";
import {
  LoginUserPayload,
  RegisterUserPayload,
  User,
} from "../../graphql/__generated__/graphql";
import useNotification from "../../hooks/useNotification";
import { LOGIN, REGISTER } from "./queries";

const useAuth = () => {
  const { contextHolder, info } = useNotification();

  const login = async (
    email: String,
    password: String
  ): Promise<LoginUserPayload> => {
    try {
      const response = await apolloClient.mutate({
        mutation: LOGIN,
        variables: { email, password },
      });

      if (!response || !response.data) throw new Error("Cannot sign user in!");

      return response.data.login;
    } catch (err: any) {
      return err && { errors: [err.message] };
      // throw err;
    }
  };

  const register = async (
    username: String,
    email: String,
    password: String
  ): Promise<RegisterUserPayload> => {
    try {
      console.log("first");
      const response = await apolloClient.mutate({
        mutation: REGISTER,
        variables: { username, email, password },
      });
      console.log("second");
      if (!response || !response.data) throw new Error("Cannot sign user in!");

      return response.data.register;
    } catch (err: any) {
      return err && { errors: [err.message] };
    }
  };
  return {
    login,
    register,
    contextHolder,
    info,
  };
};

export default useAuth;
