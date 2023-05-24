import type { Game } from '@/graphql/__generated__/graphql';

export type GameCardType = {
  game: Game;
  colorBgContainer: string;
  userGameLoading?: boolean;
  openGameListEditor?: (game: Game) => void;
  isAdded?: boolean;
};
