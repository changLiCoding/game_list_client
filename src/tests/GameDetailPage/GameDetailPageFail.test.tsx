import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';

import GameDetail from '@/pages/GameDetail';
import ContextWrapper from '@/ContextWrapper';

vi.mock('../../services/game/useGetGameById', async () => {
  const actual: unknown = await vi.importActual(
    '../../services/game/useGetGameById'
  );
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    default: () => ({
      getGame: vi.fn(),
      game: null,
      getGameFromFragment: vi.fn(() => {
        return null;
      }),
    }),
  };
});

describe('Game Detail Page', () => {
  it('should render a warning message if the game is not found', async () => {
    vi.mock('react-router-dom', async () => {
      const actual: unknown = await vi.importActual('react-router-dom');
      if (typeof actual !== 'object')
        throw new Error('Import Actual did not return not an object');
      return {
        ...actual,
        useParams: vi.fn(() => ({ id: '4' })),
      };
    });

    const { queryByText, debug } = render(
      <ContextWrapper>
        <GameDetail />
      </ContextWrapper>
    );

    expect(queryByText('Game not found')).toBeInTheDocument();
  });
});
