import { useMutation } from '@apollo/client';

import { LOGIN, REGISTER } from '@/services/authentication/queries';
import useNotification from '@/hooks/useNotification';
import type {
  LoginUserPayload,
  RegisterUserPayload,
} from '@/graphql/__generated__/graphql';

const useAuth = () => {
  const { contextHolder, info } = useNotification('auth');
  const [loginRequest, { client: afterLoginClient }] = useMutation(LOGIN);
  const [registerRequest, { client: afterRegisterClient }] =
    useMutation(REGISTER);

  const login = async (
    email: string,
    password: string
  ): Promise<LoginUserPayload> => {
    try {
      const response = await loginRequest({
        variables: { email, password },

        onCompleted: () => {
          afterLoginClient.resetStore();
        },
      });
      if (
        !response ||
        !response.data ||
        !response.data.login ||
        response.data.login.errors[0]
      )
        throw new Error(response.data.login.errors[0]);

      return response.data.login;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return err && { errors: [err.message] };
      }
      // Handle other types of errors
      return { errors: ['Unknown'] };
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<RegisterUserPayload> => {
    try {
      const response = await registerRequest({
        variables: { username, email, password },
        onCompleted: () => {
          afterRegisterClient.resetStore();
        },
      });

      if (
        !response ||
        !response.data ||
        !response.data.register ||
        response.data.register.errors[0]
      )
        throw new Error(response.data.register.errors[0]);

      return response.data.register;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return err && { errors: [err.message] };
      }

      return { errors: ['Unknown'] };
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

// import { useState } from "react";
// import { apolloClient } from "../../graphql";
// import {
//   LoginUserPayload,
//   RegisterUserPayload,
//   User,
// } from "../../graphql/__generated__/graphql";
// import useNotification from "../../hooks/useNotification";
// import { LOGIN, REGISTER } from "./queries";

// const useAuth = () => {
//   const { contextHolder, info } = useNotification();

//   const login = async (
//     email: String,
//     password: String
//   ): Promise<LoginUserPayload> => {
//     try {
//       const response = await apolloClient.mutate({
//         mutation: LOGIN,
//         variables: { email, password },
//       });

//       if (!response || !response.data) throw new Error("Cannot sign user in!");

//       return response.data.login;
//     } catch (err: any) {
//       return err && { errors: [err.message] };
//       // throw err;
//     }
//   };

//   const register = async (
//     username: String,
//     email: String,
//     password: String
//   ): Promise<RegisterUserPayload> => {
//     try {
//       const response = await apolloClient.mutate({
//         mutation: REGISTER,
//         variables: { username, email, password },
//       });

//       if (!response || !response.data) throw new Error("Cannot sign user in!");

//       return response.data.register;
//     } catch (err: any) {
//       return err && { errors: [err.message] };
//     }
//   };
//   return {
//     login,
//     register,
//     contextHolder,
//     info,
//   };
// };

// export default useAuth;
