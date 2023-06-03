import { describe, it } from 'vitest';
import { screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { GET_ALL_GAMES } from '@/services/games/queries';
import { renderWithProviders } from '@/utils/test-utils';
import { store } from '@/app/store';
import Home from '@/pages/Home';
import { GET_GAME_FILTERS } from '@/services/game/queries';

const mocks = [
  {
    request: {
      query: GET_ALL_GAMES,
      variables: {
        genre: [],
        tag: [],
        platform: [],
        year: undefined,
        sortBy: 'name',
        search: '',
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

describe('Games List Component', () => {
  // beforeEach(() => {
  //   global.innerWidth = 550;
  //   global.dispatchEvent(new Event('resize'));
  // });

  it('should render the games list as a grid and show hovered cards', async () => {
    renderWithProviders(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ConfigProvider>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </ConfigProvider>
      </MockedProvider>,
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

    // Expect the card to be inserted into the dom
    expect(await screen.findByText('Score: 5')).toBeInTheDocument();
    expect(await screen.findByText('Tags')).toBeInTheDocument();
  });

  // aria-label="home-filter-mobile-view"

  it('should render the games list as a list (mobile)', async () => {
    global.innerWidth = 1080;
    global.dispatchEvent(new Event('resize'));

    renderWithProviders(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ConfigProvider>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </ConfigProvider>
      </MockedProvider>,
      { store }
    );

    expect(await screen.findByText('Game 1')).toBeInTheDocument();
    expect(await screen.findByText('Game 2')).toBeInTheDocument();
    expect(await screen.findByText('Game 3')).toBeInTheDocument();

    await userEvent.click(await screen.findByLabelText('set-list-view'));
    // screen.debug(undefined, 3000000000, {
    //   highlight: true,
    //   maxDepth: undefined,
    // });

    // aria-label="home-filter-mobile-view"
    expect(await screen.findByLabelText('view-list')).toBeInTheDocument();
    expect(
      await screen.findByLabelText('home-filter-mobile-view')
    ).toBeInTheDocument();
  });
});
