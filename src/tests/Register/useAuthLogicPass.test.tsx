import { renderHook } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';
import { vi } from 'vitest';
import useAuth from '@/services/authentication/useAuth';

const username = uuidv4();

vi.mock('@apollo/client', async () => {
  const actual: any = await vi.importActual('@apollo/client');
  return {
    ...actual,
    useMutation: vi.fn(() => [
      vi.fn(() => ({
        data: {
          register: {
            user: {
              username,
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

describe('Register logic in useAuth', () => {
  it('Successful send register request', async () => {
    const { result } = renderHook(() => useAuth());

    const userData = await result.current.register(
      username,
      `${username}@gmail.com`,
      'password'
    );

    expect(userData?.user?.username).toEqual(username);
  });
});
