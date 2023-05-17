import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import UserGameList from '@/pages/UserGameList/UserGameList';
import ContextWrapper from '@/ContextWrapper';

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
      platforms: ['Xbox', 'macOS', 'SegaDreamcast'],
      tags: ['Action', 'Adventure', 'Indie'],
    }),
  };
});

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);

describe('Get games according to list types for a user', () => {
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
});
