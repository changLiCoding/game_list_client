import { Game } from '@/graphql/__generated__/graphql';

export type GameDataType = Game & {
  key: React.Key;
};
