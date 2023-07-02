import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import useNotification from '@/hooks/useNotification';

import type {
  Game as GameType,
  Like as LikeType,
} from '@/graphql/__generated__/graphql';
import useAddRemoveGameCustomHook from '@/hooks/useAddRemoveGameCustomHook';
import useAddRemoveLike from '@/services/like/useAddRemoveLike';
import { StatusType } from '@/services/userGames/useAddDeleteGame';

const useRemoveModalHook = (status?: StatusType) => {
  const { warning, contextHolder } = useNotification();

  const { confirm } = Modal;

  const { handleRemoveGameHook } = useAddRemoveGameCustomHook(status);

  const { removeLike } = useAddRemoveLike();

  const showRemoveConfirm = (
    obj: GameType | LikeType,
    type: string,
    setOpen?: (open: boolean) => void
  ) => {
    confirm({
      title: `Are you sure to remove ${
        type === 'game' ? (obj as GameType).name : (obj as GameType).name
      } from your list?`,
      icon: <ExclamationCircleFilled />,
      content: `Click Yes would remove all data of this ${type} as well.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        if (type === 'game') {
          await handleRemoveGameHook(obj as GameType);
          warning(
            `Game ${(obj as GameType).name} has been removed from your list.`
          );
          if (setOpen) {
            setOpen(false);
          }
        } else if (type === 'like') {
          await removeLike((obj as GameType).id, 'Game');
          warning(
            `Game ${
              (obj as GameType).name
            } has been removed from your favorite list.`
          );
        }
      },
      zIndex: 1041,
    });
  };

  return { showRemoveConfirm, contextRemoveModal: contextHolder };
};

export default useRemoveModalHook;
