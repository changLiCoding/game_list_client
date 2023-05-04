import { describe, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

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
      allGames: vi.fn().mockReturnValue({
        games: [
          {
            id: '1',
            name: 'Game 1',
            description: 'Description 1',
            imageURL: 'https://via.placeholder.com/150',
            tags: ['3D', 'Fantasy'],
          },
          {
            id: '2',
            name: 'Game 2',
            description: 'Description 2',
            imageURL: 'https://via.placeholder.com/150',
            tags: ['3D', 'Fantasy', 'Soullike'],
          },
        ],
        errors: [],
      }),
      info: vi.fn(),
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
      getAllGenres: vi.fn().mockReturnValue({
        genres: [
          {
            name: 'Genre 1',
          },
          {
            name: 'Genre 2',
          },
        ],
        errors: [],
      }),
      getAllPlatforms: vi.fn().mockReturnValue({
        platforms: [
          {
            name: 'Platform 1',
          },
          {
            name: 'Platform 2',
          },
        ],
        errors: [],
      }),
      getAllTags: vi.fn().mockReturnValue({
        tags: [
          {
            name: 'Tag 1',
          },
          {
            name: 'Tag 2',
          },
        ],
        errors: [],
      }),
      info: vi.fn(),
    }),
  };
});

vi.mock('react-router-dom', async () => {
  const actual: unknown = await vi.importActual('react-router-dom');
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    useNavigate: vi.fn().mockReturnValue((value: string) => value),
  };
});

describe('Home Page', () => {
  it('Render Home Page When Data Is Loading', async () => {
    render(
      <ContextWrapper>
        <Home />
      </ContextWrapper>
    );
    expect(screen.getByText('InfoBar')).toBeInTheDocument();
    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(screen.getByText('All Games')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Loading')).toBeNull();
    });
  });
});
