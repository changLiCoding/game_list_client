import Home from '../../src/pages/Home/Home';
import { GET_GAME_FILTERS } from '@/services/game/queries';
import { GET_ALL_GAMES } from '@/services/games/queries';
import { DefaultMockedProvider, renderCypress } from '@/utils/test-utils';

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

describe('<Home />', () => {
  it('renders', () => {
    cy.viewport(1920, 1080);
    renderCypress(
      <DefaultMockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </DefaultMockedProvider>,
      {
        preloadedState: {
          homeSearch: {
            view: 'grid',
          },
        },
      }
    );

    cy.viewport('ipad-2');
    cy.contains('Game 1');
    // cy.contains('Dredge');

    // cy.contains(`[aria-label="view-grid"]`);

    // // Expect the layout to render as a grid
    // expect(await screen.findByLabelText('view-grid')).toBeInTheDocument();

    // // Ensure the card is not visible (user has not hovered over it yet)
    // expect(screen.queryByText('Score: 5')).not.toBeInTheDocument();

    // // Hover over Game 1's card
    // await userEvent.hover(await screen.findByText('Game 1'));

    // // Expect the card to be inserted into the dom
    // expect(await screen.findByText('Score: 5')).toBeInTheDocument();
    // expect(await screen.findByText('Tags')).toBeInTheDocument();

    // expect(await screen.findByText('Dead Space')).toBeInTheDocument();
    // expect(await screen.findByText('Dredge')).toBeInTheDocument();
  });
});
