import type { OperationVariables, QueryResult } from '@apollo/client';
import type {
  Game,
  GetUserGameByGameIdQuery,
} from '@/graphql/__generated__/graphql';

export type GameCardType = {
  game: Game;
  colorBgContainer: string;
  userGameLoading?: boolean;
  fetchUserGame?: ({
    variables,
  }: {
    variables: {
      gameId: string;
    };
  }) => Promise<QueryResult<GetUserGameByGameIdQuery, OperationVariables>>;
};
