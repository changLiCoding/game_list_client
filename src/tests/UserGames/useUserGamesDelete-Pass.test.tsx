import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import useUserGames from '@/services/userGames/useUserGames';

vi.mock('@apollo/client', async () => {
  const actual: unknown = await vi.importActual('@apollo/client');
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    useMutation: vi.fn(() => [
      vi.fn(() => ({
        data: {
          deleteUserGames: {
            userGame: {
              id: '52',
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
    useQuery: vi.fn(() => ({
      loading: false,
      data: {
        userGames: [],
      },
    })),
  };
});

describe('useUserGames hook', () => {
  it("Successfully delete a game from the user's list", async () => {
    const { result } = renderHook(() => useUserGames());

    const deleteUserGamesData = await result.current.deleteUserGames(17);
    expect((deleteUserGamesData as { errors: string[] }).errors).toEqual([]);
  });
});
