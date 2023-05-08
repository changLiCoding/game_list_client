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
                id: '1',
                name: 'Pokémon Black',
                description: 'Ex ut omnis. Quasi delectus eos.',
                imageURL: 'https://loremflickr.com/300/300/all',
                releaseDate: '2015-07-17T00:00:00Z',
                avgScore: 0.3,
                genres: ['Real-time tactics', 'Rhythm'],
                platforms: ['PlayStation 4', 'Game Boy'],
                tags: ['Action', 'Action'],
              },
            },
            errors: [],
          },
        },
      })),
      { loading: false, error: false },
    ]),
  };
});

vi.mock('../../../constants.ts', async () => {
  const actual: unknown = await vi.importActual('../../../constants.ts');

  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    getTokenFromLocalStorage: vi.fn(() => 'token'),
  };
  // getTokenFromLocalStorage: {
  //   context: {
  //     headers: {
  //       authorization:
  //         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyNiwiZXhwIjoxNjg2MTYwNzY2fQ.cuRDDV8KVX8nUk1soQb1JH6VB8N7rGFzVkSqizWtvdU',
  //     },
  //   },
  // },
});

describe('AddUserGames logic in useAddDeleteGame hook', () => {
  it('Successful add game in UserGame', async () => {
    const { result } = renderHook(() => useAddDeleteGame());
    const addUserGamesData = await result.current.addUserGames('17');
    expect((addUserGamesData as { errors: string[] }).errors).toEqual([]);
    expect(
      parseInt(
        (
          addUserGamesData as {
            userGame: {
              id: string;
            };
          }
        ).userGame.id,
        10
      )
    ).toBeGreaterThan(0);
  });
});
