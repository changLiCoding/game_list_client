import { describe, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useTokenAuth from '@/hooks/useTokenAuth';

const localStorage: Record<string, string> = {};

export const localStorageMock = {
  getItem(key: string) {
    return localStorage[key] || null;
  },
  setItem(key: string, value: string) {
    localStorage[key] = value.toString();
  },
  removeItem(key: string) {
    delete localStorage[key];
  },
  clear() {
    Object.keys(localStorage).forEach((key) => delete localStorage[key]);
  },
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});
const mockDispatch = vi.fn();
const getUserFunc = vi.fn();

vi.mock('react-redux', async () => {
  const actual: unknown = await vi.importActual('react-redux');
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

vi.mock('../services/user/useGetUser', async () => {
  const actual: unknown = await vi.importActual('../services/user/useGetUser');
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    default: () => ({
      getUser: getUserFunc,
      loading: false,
      data: {
        getUserById: {
          username: 'Vv',
        },
      },
    }),
  };
});

vi.mock('../app/hooks', async () => {
  const actual: unknown = await vi.importActual('../app/hooks');
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    useAppSelector: vi.fn().mockReturnValue({
      user: {
        username: 'Vv',
      },
    }),
  };
});

describe('Router', () => {
  it('Renders Router Hook', () => {
    localStorageMock.setItem('token', import.meta.env.VITE_TOKEN_TEST);
    const { result } = renderHook(() => useTokenAuth());

    expect(result.current.userState).toEqual({
      user: {
        username: 'Vv',
      },
    });
  });
});
