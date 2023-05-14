import { describe, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContextWrapper from '@/ContextWrapper';
import GamesList from '@/components/AllGames/GamesList/index';

vi.mock('../../../services/games/useAllGames', async () => {
  const actual: unknown = await vi.importActual(
    '../../../services/games/useAllGames'
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
        },
      ],
    }),
  };
});

describe('Games List Component', () => {
  it('should render the games card when isCardView true', async () => {
    const { queryByText, queryByLabelText } = render(
      <ContextWrapper>
        <GamesList isCardView />
      </ContextWrapper>
    );

    expect(screen.getByText('Game 1')).toBeInTheDocument();
    expect(screen.getByText('Game 2')).toBeInTheDocument();
    expect(screen.getByText('Game 3')).toBeInTheDocument();

    const game1 = screen.getByText('Game 1');
    const game2 = screen.getByText('Game 2');
    const game3 = screen.getByText('Game 3');

    await userEvent.hover(game1);
    await waitFor(() => {
      expect(queryByText('Fantasy')).toBeInTheDocument();
      expect(queryByText('3D')).toBeInTheDocument();
      expect(queryByText('4D')).not.toBeInTheDocument();
      expect(queryByText('2D')).not.toBeInTheDocument();
      expect(queryByLabelText('frown')).toBeInTheDocument();
      expect(queryByLabelText('smile')).not.toBeInTheDocument();
      expect(queryByLabelText('meh')).not.toBeInTheDocument();
    });

    await userEvent.hover(game2);
    waitFor(() => {
      expect(queryByText('3D')).toBeInTheDocument();
      expect(queryByText('Soullike')).toBeInTheDocument();
      expect(queryByText('2D')).not.toBeInTheDocument();
      expect(queryByText('Action')).not.toBeInTheDocument();
      expect(queryByLabelText('smile')).toBeInTheDocument();
      expect(queryByLabelText('meh')).not.toBeInTheDocument();
    });

    await userEvent.hover(game3);
    await waitFor(() => {
      expect(queryByText('2D')).toBeInTheDocument();
      expect(queryByText('4D')).toBeInTheDocument();
      expect(queryByLabelText('meh')).toBeInTheDocument();
      expect(queryByLabelText('smile')).toBeInTheDocument();
      expect(queryByLabelText('frown')).toBeInTheDocument();
    });
  });
});
