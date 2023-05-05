import { describe, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import ContextWrapper from '@/ContextWrapper';
import GamesList from '@/components/AllGames/GamesList/index';

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
          imageURL: 'https://via.placeholder.com/150',
          tags: ['3D', 'Fantasy'],
        },
        {
          __typename: 'Game',
          id: '2',
          name: 'Game 2',
          description: 'Description 2',
          imageURL: 'https://via.placeholder.com/150',
          tags: ['3D', 'Fantasy', 'Soullike'],
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

    waitFor(() => {
      expect(screen.getByText('Game 1')).toBeInTheDocument();
      expect(screen.getByText('Game 2')).toBeInTheDocument();
    });
  });
});
