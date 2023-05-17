import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import UserGameList from '@/pages/UserGameList/UserGameList';
import ContextWrapper from '@/ContextWrapper';
import FilterColumn from '@/components/UserListFilterColumn';

vi.mock('@/services/userGames/useGamesByStatus', async () => {
  const actual: unknown = await vi.importActual(
    '@/services/userGames/useGamesByStatus'
  );
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    default: () => ({
      gamesByStatusForAUser: {
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
              tags: ['Indie', 'Fantasy'],
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
              platforms: ['Sega Dreamcast', 'PlayStation 5'],
              tags: ['3D', 'Multiplayer'],
              __typename: 'Game',
            },
            {
              avgScore: 5.6,
              genres: ['Real-time strategy', 'Turn-based strategy'],
              id: '41',
              imageURL:
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co3p2d.png',
              name: 'Halo 3',
              platforms: ['Sega Dreamcast', 'PlayStation 3'],
              tags: ['Indie', 'Adventure'],
              __typename: 'Game',
            },
          ],
        },
      },
    }),
  };
});

vi.mock('@/services/game/useGame', async () => {
  const actual: unknown = await vi.importActual('@/services/game/useGame');
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    default: () => ({
      genres: ['First-person shooter', 'Puzzle', 'Trivia'],
      platforms: ['Xbox', 'macOS'],
      tags: ['Action', 'Adventure'],
    }),
  };
});

// vi.mock('../../services/userGames/useGamesByStatus', async () => {
//   const actual: unknown = await vi.importActual(
//     '../../services/userGames/useGamesByStatus'
//   );
//   if (typeof actual !== 'object')
//     throw new Error('Import Actual did not return not an object');
//   return {
//     ...actual,
//     default: () => ({
//       gamesByStatusForAUserLoading: false,
//       gamesByStatusForAUser: {
//         gamesByStatusForAUser: {
//           playing: [
//             {
//               avgScore: 6.9,
//               description: 'Maiores cupiditate ut. Qui et tempore.',
//               genres: ['Survival', 'Trivia'],
//               id: '26',
//               imageURL: 'https://loremflickr.com/300/300/game',
//               name: 'Mega Man Battle Network',
//               platforms: ['PlayStation Portable', 'PlayStation Vita'],
//               releaseDate: '2017-04-25T00:00:00Z',
//               tags: ['Singleplayer', 'Fantasy'],
//               __typename: 'Game',
//             },
//             {
//               avgScore: 1.7,
//               description: 'Aut ab accusantium. Molestiae ut ea.',
//               genres: ['Platformer', 'Survival horror'],
//               id: '27',
//               imageURL: 'https://loremflickr.com/300/300/game',
//               name: 'Halo 2',
//               platforms: ['PlayStation', 'Sega Dreamcast'],
//               releaseDate: '2019-08-01T00:00:00Z',
//               tags: ['2D', 'Adventure'],
//               __typename: 'Game',
//             },
//           ],
//           planning: [
//             {
//               avgScore: 1.8,
//               description: 'Aut ab accusantium. Molestiae ut ea.',
//               genres: ['Platformer', 'Survival horror'],
//               id: '28',
//               imageURL: 'https://loremflickr.com/300/300/game',
//               name: 'Halo 3',
//               platforms: ['Pokemon Y'],
//               releaseDate: '2019-08-01T00:00:00Z',
//               tags: ['Adventure'],
//               __typename: 'Game',
//             },
//           ],
//           completed: [],
//           paused: [],
//           dropped: [],
//         },
//       },
//     }),
//   };
// });

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);

describe('Get games according to list types for a user', () => {
  it('should render all games for a user', async () => {
    render(
      <ContextWrapper>
        <UserGameList />
      </ContextWrapper>
    );

    const gameElements = screen.queryAllByText('Pokemon Alpha Sapphire');
    expect(gameElements[0].textContent).toBe('Pokemon Alpha Sapphire');
    const avgScoreElements = screen.queryAllByText('2.5');
    expect(avgScoreElements[0].textContent).toBe('2.5');
    const gamePlanningElements = screen.queryAllByText('Halo 3');
    expect(gamePlanningElements[0].textContent).toBe('Halo 3');
  });

  it('should search for games using search bar', async () => {
    render(
      <ContextWrapper>
        <UserGameList />
      </ContextWrapper>
    );

    const searchBar = screen.getByTestId('search-bar-desktop');
    await userEvent.type(searchBar, 'Halo 3');
    const gamePlanningElements1 = screen.queryAllByText('Halo 3');
    expect(gamePlanningElements1.length).toBeGreaterThan(0);
    const gamePlanningElements2 = screen.queryAllByText('Halo 2');
    expect(gamePlanningElements2.length).toBe(0);
  });

  it('should render filter column for user', async () => {
    render(
      <ContextWrapper>
        <FilterColumn />
      </ContextWrapper>
    );

    const downArrow = screen.getByTestId('down-arrow');
    await userEvent.click(downArrow);

    const planningElement = await screen.findByText('Dropped');
    expect(planningElement).toBeInTheDocument();

    // await userEvent.keyboard('{space}{arrowdown}{space}');
  });
});
