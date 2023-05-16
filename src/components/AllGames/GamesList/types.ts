import type { Game } from '@/graphql/__generated__/graphql';

export type GamesListType = {
  isCardView: boolean;
};

export type ListType = {
  game: Game;
  colorBgContainer: string;
};

export type GameCardType = {
  game: Game;
  colorBgContainer: string;
};
