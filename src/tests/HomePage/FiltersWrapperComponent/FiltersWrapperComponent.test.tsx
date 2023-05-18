import { describe, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContextWrapper from '@/ContextWrapper';
import FiltersWrapper from '@/components/FiltersWrapper';

vi.mock('../../../services/game/useGetFilters', async () => {
  const actual: unknown = await vi.importActual(
    '../../../services/game/useGetFilters'
  );
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    default: () => ({
      genres: ['Genre 1', 'Genre 2'],
      platforms: ['Platform 1', 'Platform 2'],
      tags: ['Tag 1', 'Tag 2'],
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
        md: true,
        lg: false,
        xl: false,
        xxl: false,
      }),
    },
  };
});

describe('Filters Wrapper Component', () => {
  it('Render Filters Wrapper Component in Tablet Screen', async () => {
    const mockFunc = vi.fn();
    const { queryByText, queryAllByText } = render(
      <ContextWrapper>
        <FiltersWrapper setTagsArr={mockFunc} />
      </ContextWrapper>
    );

    expect(queryAllByText('Genres')[0]).toBeInTheDocument();

    const genres = screen.getByTestId('dropdown-Genres')
      .firstElementChild as Element;
    await userEvent.click(genres);

    await waitFor(() => {
      expect(queryByText('Genre 1')).toBeInTheDocument();
      expect(queryByText('Genre 2')).toBeInTheDocument();
    });

    expect(queryAllByText('Tags')[0]).toBeInTheDocument();

    const tags = screen.getByTestId('dropdown-Tags')
      .firstElementChild as Element;
    await userEvent.click(tags);

    await waitFor(() => {
      expect(queryByText('Tag 1')).toBeInTheDocument();
      expect(queryByText('Tag 2')).toBeInTheDocument();
    });

    const platforms = screen.getByTestId('dropdown-Platforms')
      .firstElementChild as Element;
    await userEvent.click(platforms);

    await waitFor(() => {
      expect(queryByText('Platform 1')).toBeInTheDocument();
      expect(queryByText('Platform 2')).toBeInTheDocument();
    });
  });
});
