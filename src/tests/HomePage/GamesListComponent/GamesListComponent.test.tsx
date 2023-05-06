import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

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
          imageURL: 'https://via.placeholder.com/150',
          tags: ['3D', 'Fantasy'],
          releaseDate: '2021-01-01 00:00:00',
          avgScore: 5,
        },
        {
          __typename: 'Game',
          id: '2',
          name: 'Game 2',
          description: 'Description 2',
          imageURL: 'https://via.placeholder.com/150',
          tags: ['3D', 'Fantasy', 'Soullike'],
          releaseDate: '2021-01-02 00:00:00',
          avgScore: 10,
        },
        {
          __typename: 'Game',
          id: '3',
          name: 'Game 3',
          description: 'Description 3',
          imageURL: 'https://via.placeholder.com/150',
          tags: ['3D', 'Soullike'],
          releaseDate: '2021-01-03 00:00:00',
          avgScore: 8,
        },
      ],
    }),
  };
});

describe('Games List Component', () => {
  it('should render the games list', async () => {
    render(
      <ContextWrapper>
        <GamesList />
      </ContextWrapper>
    );

    expect(screen.getByText('Game 1')).toBeInTheDocument();
    expect(screen.getByText('Game 2')).toBeInTheDocument();
    // const game1 = screen.getByText('Game 1');
    // const game2 = screen.getByText('Game 2');
    // const game3 = screen.getByText('Game 3');

    // userEvent.hover(game1);
    // expect(screen.getByText('Fantasy')).toBeInTheDocument();
    // expect(screen.getByText('3D')).toBeInTheDocument();
    // expect(screen.queryByText('2021-01-01')).not.toBeInTheDocument();
    // const frownIcon = screen.getByLabelText('frown');
    // expect(frownIcon).toBeInTheDocument();

    // userEvent.hover(game2);
    // expect(screen.getByText('Fantasy')).toBeInTheDocument();
    // expect(screen.getByText('3D')).toBeInTheDocument();
    // expect(screen.getByText('Soullike')).toBeInTheDocument();
    // expect(screen.getByText('2021-01-02')).toBeInTheDocument();
    // const smileIcon = screen.getByLabelText('smile');
    // expect(smileIcon).toBeInTheDocument();

    // userEvent.hover(game3);
    // const mehIcon = screen.getByLabelText('meh');
    // expect(mehIcon).toBeInTheDocument();
  });
});
