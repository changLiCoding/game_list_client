import { act, renderHook } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  useMutation,
} from '@apollo/client';
import { REGISTER } from '@/services/authentication/queries';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_BACKEND,
});

describe('Register Service', () => {
  it('Successful send register request', async () => {
    const username = uuidv4();
    const { result: resultRegistration } = renderHook(() => useMutation(REGISTER, {
      client: new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
      }),
    }));

    try {
      await act(async () => {
        const userData = await resultRegistration.current[0]({
          variables: {
            username,
            email: `${username}@gmail.com`,
            password: 'password2',
          },
        });
        expect(userData?.data?.register?.user?.username).toEqual(username);
      });
    } catch (e: any) {
      expect(e.message).toEqual('Email is already taken');
    }
  });

  it('Fail to register with invalid credentials', async () => {
    const { result: resultRegistration } = renderHook(() => useMutation(REGISTER, {
      client: new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
      }),
    }));

    try {
      await act(async () => {
        await resultRegistration.current[0]({
          variables: {
            username: 'Meee',
            email: import.meta.env.VITE_USER_EMAIL_TEST,
            password: 'password2',
          },
        });
      });
    } catch (e: any) {
      expect(e.message).toEqual('Email is already taken');
    }
  });
});
