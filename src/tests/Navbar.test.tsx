import { describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import Navbar from '@/components/Navbar/Navbar';
import ContextWrapper from '@/ContextWrapper';

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

describe('Navbar', () => {
  it('Shows profile information when signed in', async () => {
    localStorageMock.setItem('token', import.meta.env.VITE_TOKEN_TEST);
    const { queryByText, getByText } = render(
      <ContextWrapper>
        <Navbar />
      </ContextWrapper>
    );

    expect(getByText('Home')).toBeDefined();
    expect(getByText('Profile')).toBeDefined();
    expect(getByText('Game List')).toBeDefined();
    expect(queryByText('Sign In')).toBeNull();
  });

  it('Renders Navbar', async () => {
    // Important to reset mocks before checking as we assume the user is signed in by default
    vi.resetAllMocks();

    const { getByText } = render(
      <ContextWrapper>
        <Navbar />
      </ContextWrapper>
    );

    expect(getByText('Home')).toBeDefined();
    expect(getByText('Profile')).toBeDefined();
    expect(getByText('Game List')).toBeDefined();
    expect(getByText('Sign In')).toBeDefined();
  });
});
