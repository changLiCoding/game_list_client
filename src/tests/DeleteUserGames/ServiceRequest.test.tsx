import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  useMutation,
} from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import { renderHook, act } from '@testing-library/react';
import { REGISTER } from '@/services/authentication/queries';
import {
  ADD_USER_GAMES,
  DELETE_USER_GAMES,
} from '@/services/userGames/queries';

describe('Delete Game in UserGames', () => {
  const httpLink = new HttpLink({ uri: import.meta.env.VITE_BACKEND });
  let token: string | null = '';
  it('Successful send deleteUserGames request', async () => {
    const username = uuidv4();
    const { result: resultRegistration } = renderHook(() =>
      useMutation(REGISTER, {
        client: new ApolloClient({
          link: httpLink,
          cache: new InMemoryCache(),
        }),
        context: {
          headers: {
            Authorization: '',
          },
        },
      })
    );

    await act(async () => {
      const userData = await resultRegistration.current[0]({
        variables: {
          username,
          email: `${username}@gmail.com`,
          password: 'password',
        },
      });
      expect(userData?.data?.register?.user?.username).toEqual(username);
      token = userData?.data?.register.token;
    });

    const { result: resultAddUserGames } = renderHook(() =>
      useMutation(ADD_USER_GAMES, {
        client: new ApolloClient({
          link: httpLink,
          cache: new InMemoryCache(),
        }),
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })
    );
    await act(async () => {
      const userGame = await resultAddUserGames.current[0]({
        variables: {
          gameId: 1,
        },
      });
      expect(userGame.data.addUserGames.userGame.game.id).toEqual('1');
    });

    const { result: resultDeleteUserGames } = renderHook(() =>
      useMutation(DELETE_USER_GAMES, {
        client: new ApolloClient({
          link: httpLink,
          cache: new InMemoryCache(),
        }),
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })
    );
    await act(async () => {
      const userGame = await resultDeleteUserGames.current[0]({
        variables: {
          gameId: 1,
        },
      });
      expect(userGame.data.deleteUserGames.userGame.game.id).toEqual('1');
    });
  });

  it('should return errors message when the game is not found in the userGames', async () => {
    const { result: resultDeleteUserGames } = renderHook(() =>
      useMutation(DELETE_USER_GAMES, {
        client: new ApolloClient({
          link: httpLink,
          cache: new InMemoryCache(),
        }),
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })
    );
    await act(async () => {
      const userGame = await resultDeleteUserGames.current[0]({
        variables: {
          gameId: 1,
        },
      });

      expect(userGame.data.deleteUserGames.userGame).toBeNull();
      expect(userGame.data.deleteUserGames.errors[0]).toEqual(
        'User Game not found'
      );
    });
  });

  it('Fail send deleteUserGames request when the credentials fail', async () => {
    token = null;
    const { result } = renderHook(() =>
      useMutation(DELETE_USER_GAMES, {
        client: new ApolloClient({
          link: httpLink,
          cache: new InMemoryCache(),
        }),
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        },
      })
    );

    try {
      await act(async () => {
        const userGame = await result.current[0]({ variables: { gameId: 1 } });
        if (
          !userGame ||
          !userGame.data ||
          !userGame.data.register ||
          userGame.data.register.errors[0]
        )
          throw new Error(userGame.data.register.errors[0]);
        expect(userGame.data.deleteUserGames.userGame.game.id).toEqual('2');
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        expect(error.message).toEqual(
          'Response not successful: Received status code 401'
        );
      }
    }
  });
});
