import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import useAuth from '@/services/authentication/useAuth';

vi.mock('@apollo/client', async () => {
  const actual: any = await vi.importActual('@apollo/client');
  return {
    ...actual,
    useMutation: vi.fn(() => [
      vi.fn(() => ({
        data: {
          login: {
            user: {
              username: 'Vv',
            },
            token: 'token',
            errors: [],
          },
        },
      })),
      { loading: false, error: false },
    ]),
  };
});

describe('Login logic in useAuth', () => {
  it('Successful send login request', async () => {
    const { result } = renderHook(() => useAuth());

    const userData = await result.current.login(
      import.meta.env.VITE_USER_EMAIL_TEST,
      import.meta.env.VITE_PASSWORD_TEST,
    );

    expect(userData?.user?.username).toEqual('Vv');
  });
});
