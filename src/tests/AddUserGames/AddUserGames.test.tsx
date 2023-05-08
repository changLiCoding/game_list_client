import { vi, describe, it } from 'vitest';
import { renderHook } from '@testing-library/react';

import useAddDeleteGame from '@/services/userGames/useAddDeleteGame';

vi.mock('@apollo/client', async () => {
  const actual: unknown = await vi.importActual('@apollo/client');
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,

    useMutation: vi.fn(() => [
      vi.fn(() => ({
        data: {
          addUserGames: {
            userGame: {
              id: 1,
              game: {
                id: 1,
                name: 'game1',
                discription: 'discription1',
              },
            },
            errors: [],
          },
        },
      })),
      { loading: false, error: false },
    ]),
    useQuery: vi.fn(() => ({
      loading: false,
      data: {
        userGames: [],
      },
    })),
  };
});

vi.mock('../../../constants.ts', async () => ({
  getTokenFromLocalStorage: {
    context: {
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyNiwiZXhwIjoxNjg2MTYwNzY2fQ.cuRDDV8KVX8nUk1soQb1JH6VB8N7rGFzVkSqizWtvdU',
      },
    },
  },
}));

console.log('GetTokenFromLocalStorage', vi.get('../../../constants.ts'));

describe('AddUserGames logic in useAddDeleteGame hook', () => {
  it('Successful add game in UserGame', async () => {
    const { result } = renderHook(() => useAddDeleteGame());
    console.log('result', result);

    const userGame = await result.current.addUserGames('1');

    console.log('data', userGame);
  });
});
