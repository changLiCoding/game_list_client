import type { Game } from '@/graphql/__generated__/graphql';
import type { GameDataType } from '@/components/GamesListTable/types';

export type GameDetailsType = {
  game: Game;
  setGame: React.Dispatch<
    React.SetStateAction<GameDataType | undefined | Game | null>
  >;
};

export type GameDetailHeaderBannerType = {
  game: Game;
};
