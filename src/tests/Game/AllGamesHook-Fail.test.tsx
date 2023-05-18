import { describe, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useAllGames from '@/services/games/useAllGames';

vi.mock('@apollo/client', async () => {
  const actual: unknown = await vi.importActual('@apollo/client');
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    useQuery: vi.fn(() => ({
      loading: false,
      data: {},
    })),
  };
});

describe('useAllGames', () => {
  it('returns games and loading state', async () => {
    const { result } = renderHook(() => useAllGames());
    expect(result.current.errors).toEqual(['No games found']);
  });
});
