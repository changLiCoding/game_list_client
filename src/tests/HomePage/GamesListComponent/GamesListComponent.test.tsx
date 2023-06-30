import { describe, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GET_ALL_GAMES } from '@/services/games/queries';
import { DefaultMockedProvider, renderVite } from '@/utils/test-utils';
import { store } from '@/app/store';
import { GET_GAME_FILTERS } from '@/services/game/queries';
import GamesList from '@/components/AllGames/GamesList';

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

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

describe('Games List Component', () => {
  it('should render the games list as a grid and show hovered cards', async () => {
    const { queryByText, queryByLabelText, debug } = renderVite(
      <DefaultMockedProvider mocks={mocks}>
        <GamesList />
      </DefaultMockedProvider>,
      { store }
    );

    expect(await screen.findByText('Game 1')).toBeInTheDocument();
    expect(await screen.findByText('Game 2')).toBeInTheDocument();
    expect(await screen.findByText('Game 3')).toBeInTheDocument();

    // Expect the layout to render as a grid
    expect(await screen.findByLabelText('view-grid')).toBeInTheDocument();

    // Ensure the card is not visible (user has not hovered over it yet)
    expect(screen.queryByText('Score: 5')).not.toBeInTheDocument();

    // Hover over Game 1's card
    await userEvent.hover(await screen.findByText('Game 1'));

    // Expect the popovers to be inserted into the DOM when hovered
    await userEvent.hover(await screen.findByText('Game 1'));
    await waitFor(() => {
      expect(queryByText('Fantasy')).toBeInTheDocument();
      expect(queryByText('3D')).toBeInTheDocument();
      expect(queryByText('4D')).not.toBeInTheDocument();
      expect(queryByText('2D')).not.toBeInTheDocument();
      expect(queryByLabelText('frown')).toBeInTheDocument();
      expect(queryByLabelText('smile')).not.toBeInTheDocument();
      expect(queryByLabelText('meh')).not.toBeInTheDocument();
    });

    await userEvent.hover(await screen.findByText('Game 2'));
    await waitFor(() => {
      expect(queryByText('4D')).toBeInTheDocument();
      expect(queryByText('Soullike')).toBeInTheDocument();
      expect(queryByText('2D')).not.toBeInTheDocument();
      expect(queryByText('Action')).not.toBeInTheDocument();
      expect(queryByLabelText('smile')).toBeInTheDocument();
      expect(queryByLabelText('meh')).not.toBeInTheDocument();
    });

    await userEvent.hover(await screen.findByText('Game 3'));
    await waitFor(() => {
      expect(queryByText('2D')).toBeInTheDocument();
      expect(queryByText('4D')).toBeInTheDocument();
      expect(queryByLabelText('meh')).toBeInTheDocument();
      expect(queryByLabelText('smile')).toBeInTheDocument();
      expect(queryByLabelText('frown')).toBeInTheDocument();
    });
  });

  // aria-label="home-filter-mobile-view"

  it.skip('should render the games list as a list', async () => {
    renderVite(
      <DefaultMockedProvider mocks={mocks}>
        <GamesList />
      </DefaultMockedProvider>,
      {
        preloadedState: {
          homeSearch: {
            view: 'list',
          },
        },
      }
    );

    // Expect all games to render in the list
    expect(await screen.findByText('Game 1')).toBeInTheDocument();
    expect(await screen.findByText('Game 2')).toBeInTheDocument();
    expect(await screen.findByText('Game 3')).toBeInTheDocument();

    // Expect the layout to render as a list
    expect(await screen.findByLabelText('view-list')).toBeInTheDocument();

    // Expect the extra data that would be visible only in list form to be rendered
    expect(await screen.findByText('Rating: 5')).toBeInTheDocument();
    expect(await screen.findByText('Action')).toBeInTheDocument();
    expect(await screen.findByText('Adventure')).toBeInTheDocument();
  });
});
