import { describe, it, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import GameDetail from '@/pages/GameDetail';
import ContextWrapper from '@/ContextWrapper';

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
          imageURL:
            'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
          tags: ['3D', 'Fantasy'],
          releaseDate: '2021-01-01 00:00:00',
          avgScore: 5,
          isGameLiked: false,
        },
        {
          __typename: 'Game',
          id: '2',
          name: 'Game 2',
          description: 'Description 2',
          imageURL:
            'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
          tags: ['4D', 'Soullike'],
          releaseDate: '2021-01-02 00:00:00',
          avgScore: 10,
          isGameLiked: false,
        },
        {
          __typename: 'Game',
          id: '3',
          name: 'Game 3',
          description: 'Description 3',
          imageURL:
            'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
          tags: ['2D', 'Action'],
          releaseDate: '2021-01-03 00:00:00',
          avgScore: 8,
          isGameLiked: false,
        },
      ],
    }),
  };
});

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
    const { queryByText, queryByLabelText } = render(
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
