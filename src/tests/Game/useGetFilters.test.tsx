import { describe, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useGetFilters from '@/services/game/useGetFilters';

vi.mock('@apollo/client', async () => {
  const actual: unknown = await vi.importActual('@apollo/client');
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    useQuery: vi.fn(() => ({
      data: {
        getGenresPlatformsTags: {
          errors: [],
          genres: ['First-person shooter', 'Puzzle', 'Platformer'],
          platforms: ['PC', 'PlayStation 4', 'Xbox One'],
          tags: ['3D', 'Fantasy', 'Soullike'],
          __typename: 'GenrePlatformTag',
        },
      },
    })),
  };
});

describe('useGetFilters hook', () => {
  it('returns correct filter lists', async () => {
    const { result } = renderHook(() => useGetFilters());

    expect(result.current).toEqual({
      genres: ['First-person shooter', 'Puzzle', 'Platformer'],
      platforms: ['PC', 'PlayStation 4', 'Xbox One'],
      tags: ['3D', 'Fantasy', 'Soullike'],
    });
  });
});
