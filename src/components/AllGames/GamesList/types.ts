import type { Game } from '@/graphql/__generated__/graphql';

export type GamesListType = {
  isCardView: boolean;
};

export type GameCardType = {
  game: Game;
  colorBgContainer: string;
};
