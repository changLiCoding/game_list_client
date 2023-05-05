import { describe, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContextWrapper from '@/ContextWrapper';
import FiltersWrapper from '@/components/FiltersWrapper';

vi.mock('../../services/game/useGame', async () => {
  const actual: unknown = await vi.importActual('../../services/game/useGame');
  if (typeof actual !== 'object')
    throw new Error('Import Actual did not return not an object');
  return {
    ...actual,
    default: () => ({
      genres: [
        {
          __typename: 'Genre',
          name: 'Genre 1',
        },
        {
          __typename: 'Genre',
          name: 'Genre 2',
        },
      ],
      platforms: [
        {
          __typename: 'Platform',
          name: 'Platform 1',
        },
        {
          __typename: 'Platform',
          name: 'Platform 2',
        },
      ],
      tags: [
        {
          __typename: 'Tag',
          name: 'Tag 1',
        },
        {
          __typename: 'Tag',
          name: 'Tag 2',
        },
      ],
    }),
  };
});

describe('Filters Wrapper Component', () => {
  it('Render Filters Wrapper Component in Tablet Screen', async () => {
    vi.spyOn(window.screen, 'width', 'get').mockReturnValue(768);
    render(
      <ContextWrapper>
        <FiltersWrapper />
      </ContextWrapper>
    );
    waitFor(() => {
      expect(screen.getByText('Genres')).toBeInTheDocument();
      const genres = screen.getAllByPlaceholderText('Genre');
      userEvent.click(genres[0]);
      expect(screen.getByText('Genre 1')).toBeInTheDocument();
      expect(screen.getByText('Genre 2')).toBeInTheDocument();

      expect(screen.getByText('Tags')).toBeInTheDocument();
      const tags = screen.getAllByPlaceholderText('Tag');
      userEvent.click(tags[0]);
      expect(screen.getByText('Tag 1')).toBeInTheDocument();
      expect(screen.getByText('Tag 2')).toBeInTheDocument();

      expect(screen.getByText('Platforms')).toBeInTheDocument();
      const platforms = screen.getAllByPlaceholderText('Platform');
      userEvent.click(platforms[0]);
      expect(screen.getByText('Platform 1')).toBeInTheDocument();
      expect(screen.getByText('Platform 2')).toBeInTheDocument();
    });
  });
});
