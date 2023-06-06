import { useMutation } from '@apollo/client';

import {
  REMOVE_FOLLOWS_BY_ID,
  ADD_FOLLOWS_BY_ID,
} from '@/services/follows/queries';
import { getTokenFromLocalStorage } from '@/constants';

const useAddRemoveFollow = () => {
  const [addFollowsByIdRequest] = useMutation(ADD_FOLLOWS_BY_ID);
  const [removeFollowsByIdRequest] = useMutation(REMOVE_FOLLOWS_BY_ID);

  const addFollow = async (followedId: string) => {
    try {
      const response = await addFollowsByIdRequest({
        variables: { followedId },
        context: getTokenFromLocalStorage.context,
      });

      if (
        !response ||
        !response.data ||
        !response.data.addFollowsById ||
        response.data.addFollowsById.errors[0]
      ) {
        throw new Error(response.data.addFollowsById.errors[0]);
      }

      return response.data.addFollowsById;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error adding follow');
    }
  };

  const removeFollow = async (followedId: string) => {
    try {
      const response = await removeFollowsByIdRequest({
        variables: { followedId },
        context: getTokenFromLocalStorage.context,
      });
      if (
        !response ||
        !response.data ||
        !response.data.removeFollowsById ||
        response.data.removeFollowsById.errors[0]
      ) {
        throw new Error(response.data.removeFollowsById.errors[0]);
      }
      return response.data.removeFollowsById;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error removing follow');
    }
  };

  return { addFollow, removeFollow };
};

export default useAddRemoveFollow;
