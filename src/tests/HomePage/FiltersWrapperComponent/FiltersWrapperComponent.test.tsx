import { describe, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContextWrapper from '@/ContextWrapper';
import FiltersWrapper from '@/components/FiltersWrapper';
import { store } from '@/app/store';
import { GET_GAME_FILTERS } from '@/services/game/queries';
import { GET_ALL_GAMES } from '@/services/games/queries';
import { DefaultMockedProvider, renderVite } from '@/utils/test-utils';

// TODO: Rewrite this test when new design is implemented

// result: {
//   data: {
//     getGameFilters: {
//       tags: ['3D', 'Fantasy'],
//       genres: ['Action', 'Adventure'],
//       platforms: ['PC', 'macOS'],
//       year: 2021,
//       errors: [],
//     },
//   },

vi.mock('@/services/game/useGetFilters', async () => {
  const actual: unknown = await vi.importActual(
    '@/services/game/useGetFilters'
  );
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,

    tags: ['Tag 1', 'Tag 2'],
    genres: ['Genre 1', 'Genre 2'],
    platforms: ['Platform 1', 'Platform 2'],
    year: 2021,
    errors: [],
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

describe.skip('Filters Wrapper Component', () => {
  it('Render Filters Wrapper Component in Tablet Screen', async () => {
    const { queryByText, queryAllByText, debug } = render(
      <ContextWrapper>
        <FiltersWrapper
        // setTagsArr={mockFunc}
        />
      </ContextWrapper>
    );

    debug();

    expect(queryAllByText('Genre')[0]).toBeInTheDocument();

    const genres = screen.getByTestId('dropdown-Genre')
      .firstElementChild as Element;
    await userEvent.click(genres);

    await waitFor(() => {
      expect(queryByText('Genre 1')).toBeInTheDocument();
      expect(queryByText('Genre 2')).toBeInTheDocument();
    });

    expect(queryAllByText('Tag')[0]).toBeInTheDocument();

    const tags = screen.getByTestId('dropdown-Tag')
      .firstElementChild as Element;
    await userEvent.click(tags);

    await waitFor(() => {
      expect(queryByText('Tag 1')).toBeInTheDocument();
      expect(queryByText('Tag 2')).toBeInTheDocument();
    });

    const platforms = screen.getByTestId('dropdown-Platform')
      .firstElementChild as Element;
    await userEvent.click(platforms);

    await waitFor(() => {
      expect(queryByText('Platform 1')).toBeInTheDocument();
      expect(queryByText('Platform 2')).toBeInTheDocument();
    });
  });
});
