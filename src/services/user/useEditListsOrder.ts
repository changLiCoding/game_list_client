import { useMutation } from '@apollo/client';
import { EDIT_LISTS_ORDER } from '@/services/user/queries';
import type { UpdateUserPayload } from '@/graphql/__generated__/graphql';
import { getTokenFromLocalStorage } from '@/constants';

const useEditListsOrder = () => {
  // const { contextHolder, info } = useNotification();
  const [editListsOrder] = useMutation(EDIT_LISTS_ORDER);

  const editNewListsOrder = async (
    payload: string,
    action: string
  ): Promise<UpdateUserPayload> => {
    try {
      const response = await editListsOrder({
        variables: { payload, action },
        context: getTokenFromLocalStorage.context,
      });

      if (
        !response ||
        !response.data ||
        !response.data.updateUser ||
        response.data.updateUser.errors[0]
      )
        throw new Error(response.data.updateUser.errors[0]);

      return response.data.updateUser;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return err && { errors: [err.message] };
      }

      return { errors: ['Unknown'] };
    }
  };

  return { editNewListsOrder };
};

export default useEditListsOrder;
