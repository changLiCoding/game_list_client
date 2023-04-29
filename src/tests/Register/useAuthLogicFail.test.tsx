import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import useAuth from '@/services/authentication/useAuth';

vi.mock('@apollo/client', async () => {
  const actual: unknown = await vi.importActual('@apollo/client');
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    useMutation: vi.fn(() => [
      vi.fn(() => ({
        data: {
          register: {
            user: {
              username: null,
            },
            errors: ['Email is already taken'],
          },
        },
      })),
      { loading: false, error: false },
    ]),
  };
});

describe('Register logic in useAuth', () => {
  it('Fail to register with these credentials', async () => {
    const { result } = renderHook(() => useAuth());

    const userData = await result.current.register(
      'Meee',
      import.meta.env.VITE_USER_EMAIL_TEST,
      'password2'
    );

    expect(userData.errors[0]).toEqual('Email is already taken');
  });
});
