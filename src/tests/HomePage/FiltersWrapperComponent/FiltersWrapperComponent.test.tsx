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

const mocks = [
  {
    request: {
      query: GET_ALL_GAMES,
      variables: {
        limit: 20,
        genre: [],
        tag: [],
        platform: [],
        year: undefined,
        sortBy: 'name',
        search: '',
        offset: 0,
      },
    },
    result: {
      data: {
        allGames: [
          {
            __typename: 'Game',
            id: '1',
            name: 'Game 1',
            description: 'Description 1',
            imageURL:
              'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
            bannerURL:
              'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
            tags: ['3D', 'Fantasy'],
            genres: ['Action', 'Adventure'],
            platforms: ['PC', 'macOS'],
            releaseDate: '2021-01-01 00:00:00',
            avgScore: 5,
            totalRating: 5,
            isGameAdded: false,
            isGameLiked: false,
          },
          {
            __typename: 'Game',
            id: '2',
            name: 'Game 2',
            description: 'Description 2',
            imageURL:
              'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
            bannerURL:
              'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
            tags: ['4D', 'Soullike'],
            genres: ['Role Playing', 'Straitagy'],
            platforms: ['Xbox 360', 'Playstation 3'],
            releaseDate: '2021-01-02 00:00:00',
            avgScore: 10,
            totalRating: 5,
            isGameAdded: false,
            isGameLiked: false,
          },
          {
            __typename: 'Game',
            id: '3',
            name: 'Game 3',
            description: 'Description 3',
            imageURL:
              'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
            bannerURL:
              'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
            tags: ['2D', 'Action'],
            genres: ['JRPG', 'Simulation'],
            platforms: ['Xbox', 'Playstation 2'],
            releaseDate: '2021-01-03 00:00:00',
            avgScore: 8,
            totalRating: 5,
            isGameAdded: false,
            isGameLiked: false,
          },
        ],
      },
    },
  },
  {
    request: {
      query: GET_GAME_FILTERS,
    },
    result: {
      data: {
        getGameFilters: {
          tags: ['3D', 'Fantasy'],
          genres: ['Action', 'Adventure'],
          platforms: ['PC', 'macOS'],
          year: 2021,
          errors: [],
        },
      },
    },
  },
];

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
    const { queryByText, queryAllByText, debug } = renderVite(
      <DefaultMockedProvider mocks={mocks}>
        <FiltersWrapper
        // setTagsArr={mockFunc}
        />
      </DefaultMockedProvider>,
      {
        store,
      }
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
