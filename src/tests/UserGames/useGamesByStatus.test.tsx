import { describe, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { act } from 'react-dom/test-utils';
import useGamesByStatus from '@/services/userGames/useGamesByStatus';
import { DefaultMockedProvider } from '@/utils/test-utils';
import { GET_GAMES_BY_STATUS } from '@/services/userGames/queries';

const gamesByStatusForAUser = {
  playingCount: 3,
  planningCount: 1,
  completedCount: 3,
  pausedCount: 4,
  droppedCount: 5,
  totalCount: 15,
  justAddedCount: 0,
  justAdded: [],
  paused: [],
  completed: [],
  dropped: [],
  listsOrder: 'playing,planning,completed,dropped,paused',
  errors: [],
  planning: [],
  playing: [
    {
      avgScore: 7.9,
      description: 'Description 1',
      genres: ['Real-time strategy', 'Real-time strategy'],
      id: '40',
      bannerURL:
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
      imageURL:
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r76.png',
      name: 'Halo 2',
      totalRating: 5,
      platforms: ['SegaDreamcast', 'PlayStation 5'],
      tags: ['3D', 'Multiplayer'],
      __typename: 'Game',
      releaseDate: '2021-01-02 00:00:00',
      isGameLiked: false,
      isGameAdded: false,
    },
    {
      description: 'Description 2',
      avgScore: 5.6,
      totalRating: 25,
      genres: ['Real-time strategy', 'Turn-based strategy', 'Puzzle'],
      id: '41',
      bannerURL:
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
      imageURL:
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co3p2d.png',
      name: 'Halo 3',
      platforms: ['SegaDreamcast', 'PlayStation 3'],
      tags: ['Indie', 'Adventure'],
      __typename: 'Game',
      releaseDate: '2021-01-02 00:00:00',
      isGameLiked: false,
      isGameAdded: false,
    },
  ],
};

const mocks = [
  {
    request: {
      query: GET_GAMES_BY_STATUS,
    },
    result: {
      data: {
        gamesByStatusForAUser,
      },
    },
  },
];

const errorMocks = [
  {
    request: {
      query: GET_GAMES_BY_STATUS,
    },
    result: {
      data: {
        gamesByStatusForAUser: {
          ...gamesByStatusForAUser,
          errors: ['Cannot get games by status for the user.'],
        },
      },
    },
  },
];

describe('useGamesByStatus hook', () => {
  it('Succeed to send request in useGamesByStatus', async () => {
    const { result } = renderHook(() => useGamesByStatus(), {
      wrapper: ({ children }: PropsWithChildren<object>) => (
        <DefaultMockedProvider mocks={mocks}>{children}</DefaultMockedProvider>
      ),
    });

    await act(async () => {
      await result.current.getGamesByStatusForAUser();
    });

    expect(result.current.gamesByStatusForAUser.gamesByStatusForAUser).toEqual(
      gamesByStatusForAUser
    );
  });

  it('Expects an error to be returned', async () => {
    const { result } = renderHook(() => useGamesByStatus(), {
      wrapper: ({ children }: PropsWithChildren<object>) => (
        <DefaultMockedProvider mocks={errorMocks}>
          {children}
        </DefaultMockedProvider>
      ),
    });

    await act(async () => {
      await result.current.getGamesByStatusForAUser();
    });

    expect(
      result.current.gamesByStatusForAUser.gamesByStatusForAUser.errors
    ).toEqual(['Cannot get games by status for the user.']);
  });
});
