import type { GameDataType } from '@/components/GamesListTable/types';

export type ListEditorType = {
  userGameLoading?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  game: GameDataType;
};
