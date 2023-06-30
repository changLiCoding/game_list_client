import { describe, it, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import GameDetail from '@/pages/GameDetail';
import ContextWrapper from '@/ContextWrapper';

describe.skip('Game Detail Page', () => {
  it('should render the game detail page', async () => {
    vi.mock('react-router-dom', async () => {
      const actual: unknown = await vi.importActual('react-router-dom');
      if (typeof actual !== 'object')
        throw new Error('Import Actual did not return not an object');
      return {
        ...actual,
        useParams: vi.fn(() => ({ id: '2' })),
      };
    });

    vi.mock('../services/game/useGetGameById', async () => {
      const actual: unknown = await vi.importActual(
        '../services/game/useGetGameById'
      );
      if (typeof actual !== 'object')
        throw new Error('Import Actual did not return not an object');
      return {
        ...actual,
        default: () => ({
          game: {
            __typename: 'Game',
            id: '1',
            name: 'Game 1',
            description: 'Description 1',
            imageURL:
              'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
            tags: ['3D', 'Fantasy'],
            releaseDate: '2021-01-01 00:00:00',
            avgScore: 5,
            isGameLiked: false,
            isGameAdded: false,
          },

          error: 'null',

          getGame: vi.fn(),
          getGameFromFragment: vi.fn((id) => {
            return {
              __typename: 'Game',
              id,
              name: `Game ${id}`,
              description: `Description ${id}`,
              imageURL:
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
              tags: ['3D', 'Fantasy'],
              releaseDate: '2021-01-01 00:00:00',
              avgScore: 5,
              isGameLiked: false,
              isGameAdded: false,
            };
          }),
        }),
      };
    });

    const { queryByText, queryByLabelText, debug } = render(
      <ContextWrapper>
        <GameDetail />
      </ContextWrapper>
    );
    expect(queryByText('Game 2')).toBeInTheDocument();
    expect(queryByText('Description 2')).toBeInTheDocument();
    const downCircleButton = queryByLabelText('down-circle') as HTMLElement;

    await userEvent.click(downCircleButton);
    await waitFor(() => {
      expect(queryByText('Set as Planning')).toBeInTheDocument();
      expect(queryByText('Set as Playing')).toBeInTheDocument();
      expect(queryByText('Open List Editor')).toBeInTheDocument();
    });
  });
});
