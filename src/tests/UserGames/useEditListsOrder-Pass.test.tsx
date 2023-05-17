import { describe, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useEditListsOrder from '@/services/user/useEditListsOrder';

vi.mock('@apollo/client', async () => {
  const actual: unknown = await vi.importActual('@apollo/client');
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    useMutation: vi.fn(() => [
      vi.fn(() => ({
        data: {
          updateUser: {
            user: {
              listsOrder: 'playing,planning,completed,paused,dropped',
              __typename: 'User',
            },
            errors: [],
          },
        },
      })),
      { loading: false, error: false },
    ]),
  };
});

describe('useEditListsOrder hook', () => {
  it('Succeed to send request in editNewListsOrder', async () => {
    const { result } = renderHook(() => useEditListsOrder());
    const data = await result.current.editNewListsOrder(
      'planning,playing,completed,paused,dropped',
      'lists_order'
    );

    expect(data).toEqual({
      user: {
        listsOrder: 'playing,planning,completed,paused,dropped',
        __typename: 'User',
      },
      errors: [],
    });
  });
});
