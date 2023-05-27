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
          addUserGames: {
            userGame: {},
            errors: ['Cannot add the new game!'],
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

vi.mock('react-redux', async () => {
  const actual: unknown = await vi.importActual('react-redux');
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    useDispatch: vi.fn(() => vi.fn()),
  };
});

vi.mock('@/app/hooks', async () => {
  const actual: unknown = await vi.importActual('@/app/hooks');
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    useAppSelector: vi.fn(() => ({
      addedGames: {
        addedList: [],
      },
    })),
  };
});

describe('useUserGames hook', () => {
  it("Fail to add a game to the user's list", async () => {
    const { result } = renderHook(() => useAddDeleteGame());

    const addUserGamesData = await result.current.addUserGames('17');
    expect((addUserGamesData as { errors: string[] }).errors[0]).toEqual(
      'Cannot add the new game!'
    );
  });
});
