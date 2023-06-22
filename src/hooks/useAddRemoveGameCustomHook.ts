import type { Game as GameType } from '@/graphql/__generated__/graphql';
import { useAppSelector } from '@/app/hooks';
import useAddDeleteGame from '@/services/userGames/useAddDeleteGame';
import useNotification from '@/hooks/useNotification';

const useAddRemoveGameCustomHook = () => {
  const { addUserGames, deleteUserGames } = useAddDeleteGame();
  const { addedList } = useAppSelector((state) => state.addedGames);
  const userState = useAppSelector((state) => state.user);
  const { info, success, warning, contextHolder } = useNotification();

  const handleAddGameHook = async (gameInput: GameType) => {
    if (!addedList.includes(gameInput.id as string)) {
      if (userState?.user.id === '') {
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

  return { handleAddGameHook, handleRemoveGameHook, contextHolder };
};

export default useAddRemoveGameCustomHook;
