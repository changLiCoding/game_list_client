// Tests for the gamesForAUser query

import { apolloClient } from '@/graphql';
import { GAMES_FOR_A_USER } from '@/services/userGames/queries';

describe('Get all games for a user', () => {
  it('should return all games for a user with token', async () => {
    try {
      const query = await apolloClient.query({
        query: GAMES_FOR_A_USER,
        context: {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN_TEST}`,
          },
        },
      });

      expect(query.data.gamesForAUser).toBeTruthy();
      expect(query.data.gamesForAUser[1].name).toEqual('Halo 2');
    } catch (error) {
      console.log('Here is the error!!!!:', error);
    }
  });
});
