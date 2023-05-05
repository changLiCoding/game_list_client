import { describe, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

import useAllGames from '@/services/games/useAllGames';

vi.mock('../../services/games/useAllGames', async () => {
  const actual: unknown = await vi.importActual(
    '../../services/games/useAllGames'
  );
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    default: () => ({
      loading: false,
      games: [
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
    }),
  };
});

describe('useAllGames', () => {
  it('returns games and loading state', async () => {
    const { result } = renderHook(() => useAllGames());
    const { loading, games } = await result.current;
    expect(loading).toEqual(false);
    expect(games).toEqual([
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
