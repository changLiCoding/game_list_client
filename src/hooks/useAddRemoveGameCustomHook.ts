import type { Game as GameType } from '@/graphql/__generated__/graphql';
import { useAppSelector } from '@/app/hooks';
import useAddDeleteGame, {
  StatusType,
} from '@/services/userGames/useAddDeleteGame';
import useNotification from '@/hooks/useNotification';
import useEditUserGame from '@/services/userGames/useEditUserGame';

const useAddRemoveGameCustomHook = (status?: StatusType) => {
  const { addUserGames, deleteUserGames } = useAddDeleteGame(status);
  const { editUserGame } = useEditUserGame();
  const { addedList } = useAppSelector((state) => state.addedGames);
  const userState = useAppSelector((state) => state.user);
  const { info, success, warning, contextHolder } =
    useNotification('userGames');

  const handleAddGameHook = async (gameInput: GameType) => {
    if (!addedList.includes(gameInput.id as string)) {
      if (userState?.user.id === '' || !userState?.user.id) {
        info('Please login to add game to your GameList');
        return;
      }
      await addUserGames(gameInput.id as string);
      success(`Game ${gameInput?.name} added to your list`);
    } else {
      warning(`Game ${gameInput?.name} already added to your list`);
    }
  };

  const handleRemoveGameHook = async (gameInput: GameType) => {
    await deleteUserGames(gameInput.id as string);
    warning(`Game ${gameInput?.name} removed from your list`);
  };

  const handleEditUserGameStatus = async (
    statusType: string,
    gameInput: GameType
  ) => {
    if (userState?.user.id === '') {
      warning('Please login to edit GameList status');
      return;
    }
    await editUserGame({
      gameId: gameInput.id as string,
      gameStatus: statusType,
    });
    success(`Game ${gameInput?.name} status updated`);
  };

  return {
    handleAddGameHook,
    handleRemoveGameHook,
    handleEditUserGameStatus,
    contextHolder,
    info,
  };
};

export default useAddRemoveGameCustomHook;
