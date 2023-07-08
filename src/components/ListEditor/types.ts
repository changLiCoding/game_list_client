import type { GameDataType } from '@/components/GamesListTable/types';
import type { Game } from '@/graphql/__generated__/graphql';

export type ListEditorType = {
  isGameAdded?: boolean;
  userGameLoading?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  game: GameDataType;
  setSelectedGame: React.Dispatch<
    React.SetStateAction<GameDataType | undefined | Game | null>
  >;
};
