import { describe, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useGamesByStatus from '@/services/userGames/useGamesByStatus';

vi.mock('@apollo/client', async () => {
  const actual: unknown = await vi.importActual('@apollo/client');
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    useQuery: vi.fn(() => ({
      loading: false,
      data: {
        gamesByStatusForAUser: {
          playingCount: 2,
          planningCount: 1,
          completedCount: 3,
          pausedCount: 4,
          droppedCount: 5,
          totalCount: 15,
          completed: [],
          dropped: [],
          errors: [' Cannot get games by status for the user.'],
          listsOrder: 'playing,planning,completed,dropped,paused',
          paused: [],
          planning: [],
          playing: [],
        },
      },
    })),
  };
});

describe('useGamesByStatus hook', () => {
  it('Succeed to send request in useGamesByStatus', async () => {
    const { result } = renderHook(() => useGamesByStatus());

    expect(
      result.current.gamesByStatusForAUser.gamesByStatusForAUser.errors
    ).toEqual([' Cannot get games by status for the user.']);
  });
});
