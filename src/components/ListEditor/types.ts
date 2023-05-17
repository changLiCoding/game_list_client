import type { Game } from '@/graphql/__generated__/graphql';

export type ListEditorType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  game: Game;
};
