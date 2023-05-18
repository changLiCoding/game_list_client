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

vi.mock('@/services/game/useGetFilters', async () => {
  const actual: unknown = await vi.importActual(
    '@/services/game/useGetFilters'
  );
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

  it('should filter according to filter choices', async () => {
    render(
      <ContextWrapper>
        <UserGameList />
      </ContextWrapper>
    );

    // Select a platform filter
    const platformFilter = screen.getByTestId('dropdown-Platform');
    await userEvent.click(platformFilter.firstElementChild as Element);

    const platformSelection = screen.getByText('SegaDreamcast', {
      selector: '.ant-cascader-menu-item-content',
    });

    await userEvent.click(platformSelection);
    const platformSelectionConfirmation =
      screen.getByTestId('dropdown-Platform')?.firstChild?.textContent;
    expect(platformSelectionConfirmation).toBe('SegaDreamcast');

    const game1 = screen.queryAllByText('Halo 3', {
      selector: 'p',
    });
    expect(game1.length).toBe(1);

    const game2 = screen.getAllByText('Halo 2', {
      selector: 'p',
    });
    expect(game2.length).toBe(1);

    const game3 = screen.queryAllByText('Pokemon Alpha Sapphire', {
      selector: 'p',
    });
    expect(game3.length).toBe(0);

    // Select a tag filter
    const tagFilter = screen.getByTestId('dropdown-Tag');
    await userEvent.click(tagFilter.firstElementChild as Element);

    const tagSelection = screen.getByText('Indie', {
      selector: '.ant-cascader-menu-item-content',
    });
    await userEvent.click(tagSelection);
    const tagSelectionConfirmation =
      screen.getByTestId('dropdown-Tag')?.firstChild?.textContent;
    expect(tagSelectionConfirmation).toBe('Indie');

    const game4 = screen.queryAllByText('Halo 3', {
      selector: 'p',
    });
    expect(game4.length).toBe(1);

    const game5 = screen.queryAllByText('Halo 2', {
      selector: 'p',
    });
    expect(game5.length).toBe(0);

    const game6 = screen.queryAllByText('Pokemon Alpha Sapphire', {
      selector: 'p',
    });
    expect(game6.length).toBe(0);

    // Select a Genre filter
    const genreFilter = screen.getByTestId('dropdown-Genre');
    await userEvent.click(genreFilter.firstElementChild as Element);

    const genreSelection = screen.getByText('Puzzle', {
      selector: '.ant-cascader-menu-item-content',
    });
    await userEvent.click(genreSelection);
    const genreSelectionConfirmation =
      screen.getByTestId('dropdown-Genre')?.firstChild?.textContent;
    expect(genreSelectionConfirmation).toBe('Puzzle');

    const game7 = screen.queryAllByText('Halo 3', {
      selector: 'p',
    });
    expect(game7.length).toBe(1);

    const game8 = screen.queryAllByText('Halo 2', {
      selector: 'p',
    });
    expect(game8.length).toBe(0);

    const game9 = screen.queryAllByText('Pokemon Alpha Sapphire', {
      selector: 'p',
    });
    expect(game9.length).toBe(0);
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
