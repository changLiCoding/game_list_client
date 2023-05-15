import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import UserGameList from '@/pages/UserGameList/UserGameList';
import ContextWrapper from '@/ContextWrapper';

vi.mock('../../services/userGames/useGamesByStatus', async () => {
  const actual: unknown = await vi.importActual(
    '../../services/userGames/useGamesByStatus'
  );
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    default: () => ({
      gamesByTagForAUserLoading: false,
      gamesByTagForAUser: {
        gamesByStatusForAUser: {
          playing: [
            {
              avgScore: 6.9,
              description: 'Maiores cupiditate ut. Qui et tempore.',
              genres: ['Survival', 'Trivia'],
              id: '26',
              imageURL: 'https://loremflickr.com/300/300/game',
              name: 'Mega Man Battle Network',
              platforms: ['PlayStation Portable', 'PlayStation Vita'],
              releaseDate: '2017-04-25T00:00:00Z',
              tags: ['Singleplayer', 'Fantasy'],
              __typename: 'Game',
            },
            {
              avgScore: 1.7,
              description: 'Aut ab accusantium. Molestiae ut ea.',
              genres: ['Platformer', 'Survival horror'],
              id: '27',
              imageURL: 'https://loremflickr.com/300/300/game',
              name: 'Halo 2',
              platforms: ['PlayStation', 'Sega Dreamcast'],
              releaseDate: '2019-08-01T00:00:00Z',
              tags: ['2D', 'Adventure'],
              __typename: 'Game',
            },
          ],
          planning: [
            {
              avgScore: 1.8,
              description: 'Aut ab accusantium. Molestiae ut ea.',
              genres: ['Platformer', 'Survival horror'],
              id: '28',
              imageURL: 'https://loremflickr.com/300/300/game',
              name: 'Halo 3',
              platforms: ['Pokemon Y'],
              releaseDate: '2019-08-01T00:00:00Z',
              tags: ['Adventure'],
              __typename: 'Game',
            },
          ],
          completed: [],
          paused: [],
          dropped: [],
        },
      },
    }),
  };
});

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);

describe('Get all games for a user', () => {
  it('should render all games for a user', async () => {
    render(
      <ContextWrapper>
        <UserGameList />
      </ContextWrapper>
    );

    const gameElements = screen.queryAllByText('Halo 2');
    expect(gameElements[0].textContent).toBe('Halo 2');
    const avgScoreElements = screen.queryAllByText('1.7');
    expect(avgScoreElements[0].textContent).toBe('1.7');
    const gamePlanningElements = screen.queryAllByText('Pokemon Y');
    expect(gamePlanningElements[0].textContent).toBe('Pokemon Y');
  });
});
