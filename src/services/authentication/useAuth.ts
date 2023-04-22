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
      info(err.message);
      return err && err.message;
      // throw err;
    }
  };

  const register = async (
    username: String,
    email: String,
    password: String
  ): Promise<RegisterUserPayload> => {
    try {
      const response = await apolloClient.mutate({
        mutation: REGISTER,
        variables: { username, email, password },
      });

      if (!response || !response.data) throw new Error("Cannot sign user in!");

      return response.data.register;
    } catch (err: any) {
      info(err.message);
      return err && err.message;
    }
  };
  return {
    login,
    register,
    contextHolder,
  };
};

export default useAuth;
