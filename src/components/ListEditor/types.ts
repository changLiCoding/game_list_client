import type { Game } from '@/graphql/__generated__/graphql';

export type ListEditorType = {
  userGameLoading?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  game: Game;
};
