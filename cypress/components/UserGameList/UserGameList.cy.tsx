import { GET_GAME_FILTERS } from '@/services/game/queries';
import { DefaultMockedProvider, renderCypress } from '@/utils/test-utils';
import UserGameList from '@/pages/UserGameList';
import { GET_GAMES_BY_STATUS } from '@/services/userGames/queries';

const mocks = [
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
  {
    request: {
      query: GET_GAMES_BY_STATUS,
    },
    result: {
      data: {
        gamesByStatusForAUser: {
          playingCount: 2,
          planningCount: 1,
          completedCount: 3,
          pausedCount: 4,
          droppedCount: 5,
          totalCount: 15,
          justAddedCount: 0,
          justAdded: [],
          completed: [],
          dropped: [],
          errors: [],
          listsOrder: 'playing,planning,completed,dropped,paused',
          paused: [],
          planning: [
            {
              description: 'Description 2',
              bannerURL:
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
              totalRating: 5,
              avgScore: 2.5,
              genres: ['Roguelike', 'Puzzle'],
              id: '39',
              imageURL:
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co5esn.png',
              name: 'Pokemon Alpha Sapphire',
              platforms: ['PlayStation 5', 'Sega Genesis'],
              tags: ['Fantasy'],
              __typename: 'Game',
              releaseDate: '2021-01-02 00:00:00',
            },
          ],
          playing: [
            {
              description: 'Description 2',
              bannerURL:
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
              totalRating: 5,
              avgScore: 7.9,
              genres: ['Real-time strategy', 'Real-time strategy'],
              id: '40',
              imageURL:
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r76.png',
              name: 'Halo 2',
              platforms: ['Sega Dreamcast', 'PlayStation 5'],
              tags: ['3D', 'Multiplayer'],
              __typename: 'Game',
              releaseDate: '2021-01-02 00:00:00',
            },
            {
              description: 'Description 2',
              bannerURL:
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
              totalRating: 5,
              avgScore: 5.6,
              genres: ['Real-time strategy', 'Turn-based strategy', 'Puzzle'],
              id: '41',
              imageURL:
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co3p2d.png',
              name: 'Halo 3',
              platforms: ['Sega Dreamcast', 'PlayStation 3'],
              tags: ['Indie', 'Adventure'],
              __typename: 'Game',
              releaseDate: '2021-01-02 00:00:00',
            },
          ],
        },
      },
    },
  },
];

describe('<UserGameList />', () => {
  it('Filters games by the search filter', () => {
    cy.setLocalStorage(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2ODg0OTAyNTJ9.W--hThx7Se3R2cpS1L5T2ASm6CqzYy-OZ3k1mlFPoGE'
    );
    cy.viewport(1920, 1080);
    renderCypress(
      <DefaultMockedProvider mocks={mocks} addTypename={false}>
        <UserGameList />
      </DefaultMockedProvider>
    );

    cy.contains('Halo 2').should('exist');
    cy.contains('Halo 3').should('exist');
    cy.contains('Pokemon Alpha Sapphire').should('exist');

    cy.get('[data-testid="search-bar-desktop"]').type('Halo');

    cy.contains('Halo 2').should('exist');
    cy.contains('Halo 3').should('exist');
    cy.contains('Pokemon Alpha Sapphire').should('not.exist');

    // End up typing 'Halo 2' into the search bar
    cy.get('[data-testid="search-bar-desktop"]').type(' 2');

    cy.contains('Halo 2').should('exist');
    cy.contains('Halo 3').should('not.exist');
    cy.contains('Pokemon Alpha Sapphire').should('not.exist');

    // Clear the search bar
    cy.get('[data-testid="search-bar-desktop"]').clear();

    cy.contains('Halo 2').should('exist');
    cy.contains('Halo 3').should('exist');
    cy.contains('Pokemon Alpha Sapphire').should('exist');
  });
  it('Filters games by the selected list', () => {
    cy.setLocalStorage(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2ODg0OTAyNTJ9.W--hThx7Se3R2cpS1L5T2ASm6CqzYy-OZ3k1mlFPoGE'
    );
    cy.viewport(1920, 1080);
    renderCypress(
      <DefaultMockedProvider mocks={mocks} addTypename={false}>
        <UserGameList />
      </DefaultMockedProvider>
    );

    cy.contains('Halo 2').should('exist');
    cy.contains('Halo 3').should('exist');
    cy.contains('Pokemon Alpha Sapphire').should('exist');

    cy.get('[data-testid="listitem-Playing"]').click();

    cy.contains('Halo 2').should('exist');
    cy.contains('Halo 3').should('exist');
    cy.contains('Pokemon Alpha Sapphire').should('not.exist');

    cy.get('[data-testid="listitem-Planning"]').click();

    cy.contains('Halo 2').should('not.exist');
    cy.contains('Halo 3').should('not.exist');
    cy.contains('Pokemon Alpha Sapphire').should('exist');

    cy.get('[data-testid="listitem-All"]').click();

    cy.contains('Halo 2').should('exist');
    cy.contains('Halo 3').should('exist');
    cy.contains('Pokemon Alpha Sapphire').should('exist');
  });
  it('Filters games by the dropdown filters', () => {
    cy.setLocalStorage(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2ODg0OTAyNTJ9.W--hThx7Se3R2cpS1L5T2ASm6CqzYy-OZ3k1mlFPoGE'
    );
    cy.viewport(1920, 1080);
    renderCypress(
      <DefaultMockedProvider mocks={mocks} addTypename={false}>
        <UserGameList />
      </DefaultMockedProvider>
    );

    // Expect all games to render
    cy.contains('Halo 2').should('exist');
    cy.contains('Halo 3').should('exist');
    cy.contains('Pokemon Alpha Sapphire').should('exist');

    // Click on the genres dropdown
    cy.get('[data-testid="dropdown-genres"]').click();

    // Click the 'Action' option
    cy.get('[data-testid="option-Action"]').click();

    // Expect no games to render
    cy.contains('Halo 2').should('not.exist');
    cy.contains('Halo 3').should('not.exist');
    cy.contains('Pokemon Alpha Sapphire').should('not.exist');

    // Click the 'Genere' option clear button
    cy.get('[data-testid="dropdown-genres"] > .ant-select-clear').click();

    // Expect all games to render
    cy.contains('Halo 2').should('exist');
    cy.contains('Halo 3').should('exist');
    cy.contains('Pokemon Alpha Sapphire').should('exist');

    // Click on the genres dropdown
    cy.get('[data-testid="dropdown-platforms"]').click();

    // Click the 'Action' option
    cy.get('[data-testid="option-PC"]').click();

    // Expect all games to render
    cy.contains('Halo 2').should('not.exist');
    cy.contains('Halo 3').should('not.exist');
    cy.contains('Pokemon Alpha Sapphire').should('not.exist');

    // Click the 'Platforms' option clear button
    cy.get('[data-testid="dropdown-platforms"] > .ant-select-clear').click();

    // Expect all games to render
    cy.contains('Halo 2').should('exist');
    cy.contains('Halo 3').should('exist');
    cy.contains('Pokemon Alpha Sapphire').should('exist');

    // Click on the genres dropdown
    cy.get('[data-testid="dropdown-tags"]').click();

    // Click the 'Action' option
    cy.get('[data-testid="option-3D"]').click();

    // Expect all games to render
    cy.contains('Halo 2').should('exist');
    cy.contains('Halo 3').should('not.exist');
    cy.contains('Pokemon Alpha Sapphire').should('not.exist');

    // Click on the genres dropdown
    cy.get('[data-testid="dropdown-tags"]').click();

    // Click the 'Action' option
    cy.get('[data-testid="option-Fantasy"]').click();

    // Expect all games to render
    cy.contains('Halo 2').should('not.exist');
    cy.contains('Halo 3').should('not.exist');
    cy.contains('Pokemon Alpha Sapphire').should('exist');

    // Click the 'Platforms' option clear button
    cy.get('[data-testid="dropdown-tags"] > .ant-select-clear').click();

    // Expect all games to render
    cy.contains('Halo 2').should('exist');
    cy.contains('Halo 3').should('exist');
    cy.contains('Pokemon Alpha Sapphire').should('exist');
  });
});
