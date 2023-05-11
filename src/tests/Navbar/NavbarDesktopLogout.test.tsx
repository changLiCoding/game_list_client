import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '@/components/Navbar/Navbar';
import ContextWrapper from '@/ContextWrapper';

vi.mock('@/hooks/useTokenAuth', async () => {
  const actual: unknown = await vi.importActual('@/hooks/useTokenAuth');
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    default: () => ({
      loading: false,
      userState: {
        user: {
          bannerPicture: '',
          createdAt: '',
          games: [],
          isActive: false,
          userGames: [],
          userPicture: '',
          username: '',
          __typename: 'User',
        },
      },
    }),
  };
});

vi.mock('antd', async () => {
  const actual: unknown = await vi.importActual('antd');
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    Grid: {
      useBreakpoint: vi.fn().mockReturnValue({
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false,
        xxl: false,
      }),
    },
  };
});

describe('Navbar on Desktop', () => {
  it('Renders Navbar when sign out', async () => {
    // Important to reset mocks before checking as we assume the user is signed in by default
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
