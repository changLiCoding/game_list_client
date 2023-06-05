import { GET_GAME_FILTERS } from '@/services/game/queries';
import { GET_ALL_GAMES } from '@/services/games/queries';
import { DefaultMockedProvider, renderCypress } from '@/utils/test-utils';
import GamesList from '@/components/AllGames/GamesList';

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

describe('<GameList />', () => {
  it('should render the games list as a grid and show hovered cards', () => {
    cy.setLocalStorage(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2ODg0OTAyNTJ9.W--hThx7Se3R2cpS1L5T2ASm6CqzYy-OZ3k1mlFPoGE'
    );
    cy.viewport(1920, 1080);
    renderCypress(
      <DefaultMockedProvider mocks={mocks} addTypename={false}>
        <GamesList />
      </DefaultMockedProvider>,
      {
        preloadedState: {
          homeSearch: {
            view: 'grid',
          },
        },
      }
    );

    cy.contains(`Error!`).should('not.exist');

    cy.contains('Game 1');
    cy.contains('Game 2');
    cy.contains('Game 3');

    cy.contains(`Score: 5`).should('not.exist');
    cy.contains(`Tags`).should('not.exist');

    cy.get('[game-card-id="1"]').trigger('mouseover');

    cy.contains('Score: 5');
    cy.contains('Tags');
  });

  it('should render the games list as a list (Desktop)', () => {
    cy.setLocalStorage(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2ODg0OTAyNTJ9.W--hThx7Se3R2cpS1L5T2ASm6CqzYy-OZ3k1mlFPoGE'
    );
    cy.viewport(1920, 1080);
    renderCypress(
      <DefaultMockedProvider mocks={mocks} addTypename={false}>
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

    cy.contains(`Error!`).should('not.exist');

    cy.contains('Game 1');
    cy.contains('Game 2');
    cy.contains('Game 3');

    cy.contains('[game-card-id="1"]').should('not.exist');

    cy.contains('Rating: 5');
    cy.contains('Release Date:');
    cy.contains('PC');
    cy.contains('macOS');
    cy.contains('Tags').should('not.exist');
  });

  it('should render the games list as a list (Mobile)', () => {
    cy.setLocalStorage(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2ODg0OTAyNTJ9.W--hThx7Se3R2cpS1L5T2ASm6CqzYy-OZ3k1mlFPoGE'
    );
    cy.viewport('iphone-6');
    renderCypress(
      <DefaultMockedProvider mocks={mocks} addTypename={false}>
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

    cy.contains(`Error!`).should('not.exist');

    cy.contains('Game 1');
    cy.contains('Game 2');
    cy.contains('Game 3');

    cy.contains('[game-card-id="1"]').should('not.exist');

    cy.contains('Rating: 5');
    cy.contains('Release Date:');
    cy.get('PC').should('not.exist');
    cy.get('macOS').should('not.exist');
    cy.get('Tags').should('not.exist');
  });
});
