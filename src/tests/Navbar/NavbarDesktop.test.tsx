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
          bannerPicture: 'https://loremflickr.com/500/300/game',
          createdAt: '',
          games: [],
          isActive: false,
          userGames: [],
          userPicture: 'https://loremflickr.com/300/300/game',
          username: 'Vv',
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
  it('Shows profile information when signed in', async () => {
    const { findAllByText, getByText, findByText } = render(
      <ContextWrapper>
        <Navbar />
      </ContextWrapper>
    );

    const userProfile = screen.getByTestId('profile-image');

    expect(getByText('Home')).toBeDefined();
    expect(getByText('Profile')).toBeDefined();
    expect(getByText('Game List')).toBeDefined();
    expect(userProfile.getAttribute('src')).toEqual(
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    );

    await userEvent.hover(userProfile);
    const setting = await findByText('Settings');
    const profile = await findAllByText('Profile');
    const logout = await findByText('Logout');
    expect(setting).toBeDefined();
    expect(profile).toBeDefined();
    expect(logout).toBeDefined();
  });
});
