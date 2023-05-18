import { describe, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useGamesByStatus from '@/services/userGames/useGamesByStatus';

vi.mock('@apollo/client', async () => {
  const actual: unknown = await vi.importActual('@apollo/client');
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    useQuery: vi.fn(() => ({
      loading: false,
      data: {
        gamesByStatusForAUser: {
          playingCount: 2,
          planningCount: 1,
          completedCount: 3,
          pausedCount: 4,
          droppedCount: 5,
          totalCount: 15,
          completed: [],
          dropped: [],
          errors: [],
          listsOrder: 'playing,planning,completed,dropped,paused',
          paused: [],
          planning: [
            {
              avgScore: 2.5,
              genres: ['Roguelike', 'Puzzle'],
              id: '39',
              imageURL:
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co5esn.png',
              name: 'Pokemon Alpha Sapphire',
              platforms: ['PlayStation 5', 'Sega Genesis'],
              tags: ['Fantasy'],
              __typename: 'Game',
            },
          ],
          playing: [
            {
              avgScore: 7.9,
              genres: ['Real-time strategy', 'Real-time strategy'],
              id: '40',
              imageURL:
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r76.png',
              name: 'Halo 2',
              platforms: ['SegaDreamcast', 'PlayStation 5'],
              tags: ['3D', 'Multiplayer'],
              __typename: 'Game',
            },
            {
              avgScore: 5.6,
              genres: ['Real-time strategy', 'Turn-based strategy', 'Puzzle'],
              id: '41',
              imageURL:
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co3p2d.png',
              name: 'Halo 3',
              platforms: ['SegaDreamcast', 'PlayStation 3'],
              tags: ['Indie', 'Adventure'],
              __typename: 'Game',
            },
          ],
        },
      },
    })),
  };
});

describe('useGamesByStatus hook', () => {
  it('Succeed to send request in useGamesByStatus', async () => {
    const { result } = renderHook(() => useGamesByStatus());
    expect(result.current.gamesByStatusForAUser.gamesByStatusForAUser).toEqual({
      playingCount: 2,
      planningCount: 1,
      completedCount: 3,
      pausedCount: 4,
      droppedCount: 5,
      totalCount: 15,
      completed: [],
      dropped: [],
      errors: [],
      listsOrder: 'playing,planning,completed,dropped,paused',
      paused: [],
      planning: [
        {
          avgScore: 2.5,
          genres: ['Roguelike', 'Puzzle'],
          id: '39',
          imageURL:
            'https://images.igdb.com/igdb/image/upload/t_cover_big/co5esn.png',
          name: 'Pokemon Alpha Sapphire',
          platforms: ['PlayStation 5', 'Sega Genesis'],
          tags: ['Fantasy'],
          __typename: 'Game',
        },
      ],
      playing: [
        {
          avgScore: 7.9,
          genres: ['Real-time strategy', 'Real-time strategy'],
          id: '40',
          imageURL:
            'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r76.png',
          name: 'Halo 2',
          platforms: ['SegaDreamcast', 'PlayStation 5'],
          tags: ['3D', 'Multiplayer'],
          __typename: 'Game',
        },
        {
          avgScore: 5.6,
          genres: ['Real-time strategy', 'Turn-based strategy', 'Puzzle'],
          id: '41',
          imageURL:
            'https://images.igdb.com/igdb/image/upload/t_cover_big/co3p2d.png',
          name: 'Halo 3',
          platforms: ['SegaDreamcast', 'PlayStation 3'],
          tags: ['Indie', 'Adventure'],
          __typename: 'Game',
        },
      ],
    });
  });
});
