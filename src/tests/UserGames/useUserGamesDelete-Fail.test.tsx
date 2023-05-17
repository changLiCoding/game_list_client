import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
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
          deleteUserGames: {
            userGame: {},
            errors: ['User Game not found'],
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
  it("Fail to delete a game from the user's list", async () => {
    const { result } = renderHook(() => useAddDeleteGame());

    const deleteUserGamesData = await result.current.deleteUserGames('17');
    expect((deleteUserGamesData as { errors: string[] }).errors[0]).toEqual(
      'User Game not found'
    );
  });
});
