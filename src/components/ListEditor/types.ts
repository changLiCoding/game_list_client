import type { Game, UserGame } from '@/graphql/__generated__/graphql';

export type ListEditorType = {
  userGame: UserGame;
  userGameLoading: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  game: Game;
};
