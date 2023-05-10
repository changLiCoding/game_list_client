import { describe, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import ContextWrapper from '@/ContextWrapper';
import Home from '@/pages/Home';

// Mock useAllGames hook for testing
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

// Mock useGame hook for testing
vi.mock('../../services/game/useGame', async () => {
  const actual: unknown = await vi.importActual('../../services/game/useGame');
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    default: () => ({
      genres: [
        {
          __typename: 'Genre',
          name: 'Genre 1',
        },
        {
          __typename: 'Genre',
          name: 'Genre 2',
        },
      ],
      platforms: [
        {
          __typename: 'Platform',
          name: 'Platform 1',
        },
        {
          __typename: 'Platform',
          name: 'Platform 2',
        },
      ],
      tags: [
        {
          __typename: 'Tag',
          name: 'Tag 1',
        },
        {
          __typename: 'Tag',
          name: 'Tag 2',
        },
      ],
    }),
  };
});

describe('Home Page', () => {
  it('Render Home Page without loading', async () => {
    const { debug } = render(
      <ContextWrapper>
        <Home />
      </ContextWrapper>
    );
    debug();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('All Games')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Loading')).toBeNull();
    });
  });
});
