import { describe, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useAllGames from '@/services/games/useAllGames';

vi.mock('@apollo/client', async () => {
  const actual: unknown = await vi.importActual('@apollo/client');
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    useQuery: vi.fn(() => ({
      loading: false,
      data: {
        allGames: [
          {
            __typename: 'Game',
            id: '1',
            name: 'Game 1',
            description: 'Description 1',
            imageURL: 'https://via.placeholder.com/150',
            tags: ['3D', 'Fantasy'],
          },
          {
            __typename: 'Game',

            id: '2',
            name: 'Game 2',
            description: 'Description 2',
            imageURL: 'https://via.placeholder.com/150',
            tags: ['3D', 'Fantasy', 'Soullike'],
          },
        ],
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

describe('useAllGames', () => {
  it('returns games and loading state', async () => {
    const { result } = renderHook(() => useAllGames());

    expect(result.current.games).toEqual([
      {
        __typename: 'Game',
        id: '1',
        name: 'Game 1',
        description: 'Description 1',
        imageURL: 'https://via.placeholder.com/150',
        tags: ['3D', 'Fantasy'],
      },
      {
        __typename: 'Game',

        id: '2',
        name: 'Game 2',
        description: 'Description 2',
        imageURL: 'https://via.placeholder.com/150',
        tags: ['3D', 'Fantasy', 'Soullike'],
      },
    ]);
  });
});
