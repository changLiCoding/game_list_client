import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserGameList from '@/pages/UserGameList/UserGameList';
import { DefaultMockedProvider, renderVite } from '@/utils/test-utils';
import { GET_GAMES_BY_STATUS } from '@/services/userGames/queries';
import { GET_GAME_FILTERS } from '@/services/game/queries';

const mocks = [
  {
    request: {
      query: GET_GAMES_BY_STATUS,
    },
    result: {
      data: {
        gamesByStatusForAUser: {
          playingCount: 2,
          planningCount: 1,
          completedCount: 3,
          pausedCount: 4,
          droppedCount: 5,
          totalCount: 15,
          justAddedCount: 0,
          justAdded: [],
          completed: [],
          dropped: [],
          errors: [],
          listsOrder: 'playing,planning,completed,dropped,paused',
          paused: [],
          planning: [
            {
              description: 'Description 2',
              bannerURL:
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
              totalRating: 5,
              avgScore: 2.5,
              genres: ['Roguelike', 'Puzzle'],
              id: '39',
              imageURL:
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co5esn.png',
              name: 'Pokemon Alpha Sapphire',
              platforms: ['PlayStation 5', 'Sega Genesis'],
              tags: ['Fantasy'],
              __typename: 'Game',
              releaseDate: '2021-01-02 00:00:00',
            },
          ],
          playing: [
            {
              description: 'Description 2',
              bannerURL:
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
              totalRating: 5,
              avgScore: 7.9,
              genres: ['Real-time strategy', 'Real-time strategy'],
              id: '40',
              imageURL:
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r76.png',
              name: 'Halo 2',
              platforms: ['Sega Dreamcast', 'PlayStation 5'],
              tags: ['3D', 'Multiplayer'],
              __typename: 'Game',
              releaseDate: '2021-01-02 00:00:00',
            },
            {
              description: 'Description 2',
              bannerURL:
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
              totalRating: 5,
              avgScore: 5.6,
              genres: ['Real-time strategy', 'Turn-based strategy', 'Puzzle'],
              id: '41',
              imageURL:
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co3p2d.png',
              name: 'Halo 3',
              platforms: ['Sega Dreamcast', 'PlayStation 3'],
              tags: ['Indie', 'Adventure'],
              __typename: 'Game',
              releaseDate: '2021-01-02 00:00:00',
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: GET_GAME_FILTERS,
    },
    result: {
      data: {
        getGameFilters: {
          genres: ['First-person shooter', 'Puzzle', 'Trivia'],
          platforms: ['Xbox', 'macOS', 'Sega Dreamcast'],
          tags: ['Action', 'Adventure', 'Indie'],
          year: 2021,
          errors: [],
        },
      },
    },
  },
];

describe('Get games according to list types for a user', () => {
  it('should render all games for a user', async () => {
    renderVite(
      <DefaultMockedProvider mocks={mocks}>
        <UserGameList />
      </DefaultMockedProvider>
    );

    await waitFor(() => {
      const gameElements = screen.queryAllByText('Pokemon Alpha Sapphire');
      expect(gameElements[0].textContent).toBe('Pokemon Alpha Sapphire');
      const avgScoreElements = screen.queryAllByText('2.5');
      expect(avgScoreElements[0].textContent).toBe('2.5');
      const gamePlanningElements = screen.queryAllByText('Halo 3');
      expect(gamePlanningElements[0].textContent).toBe('Halo 3');
    });
  });

  it('should render filter column for user', async () => {
    renderVite(
      <DefaultMockedProvider mocks={mocks}>
        <UserGameList />
      </DefaultMockedProvider>
    );

    await waitFor(async () => {
      const downArrow = screen.getByTestId('down-arrow');
      await userEvent.click(downArrow);

      const planningElement = await screen.findByText('Dropped');
      expect(planningElement).toBeInTheDocument();
    });
  });
});
