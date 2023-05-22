import type { QueryResult, OperationVariables } from '@apollo/client';
import type { GameDataType } from '@/components/GamesListTable/types';
import { GetUserGameByGameIdQuery } from '@/graphql/__generated__/graphql';

export type ListEditorType = {
  setGame: (game: GameDataType) => void;
  userGameLoading?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  game: GameDataType;

  fetchUserGame: ({
    variables,
  }: {
    variables: {
      gameId: string;
    };
  }) => Promise<QueryResult<GetUserGameByGameIdQuery, OperationVariables>>;
};
