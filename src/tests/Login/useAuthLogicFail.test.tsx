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
          login: {
            user: {
              username: null,
            },
            errors: ['Invalid email or password'],
          },
        },
      })),
      { loading: false, error: false },
    ]),
  };
});

describe('Login logic in useAuth', () => {
  it('Fail to login with these credentials', async () => {
    const { result } = renderHook(() => useAuth());

    const userData = await result.current.login(
      import.meta.env.VITE_USER_EMAIL_TEST,
      'password2'
    );

    expect(userData.errors[0]).toEqual('Invalid email or password');
  });
});
