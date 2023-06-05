import { useMutation } from '@apollo/client';

import { ADD_LIKE_TO_LIKEABLE, REMOVE_LIKE_FROM_LIKEABLE } from './querires';
import { getTokenFromLocalStorage } from '@/constants';
import type {
  AddLikeToLikeablePayload,
  RemoveLikeFromLikeablePayload,
} from '@/graphql/__generated__/graphql';
import { GET_ALL_STATUS_UPDATES_FOR_A_USER } from '../statusUpdate/queries';

const useAddRemoveLike = () => {
  const [addLikeRequest] = useMutation(ADD_LIKE_TO_LIKEABLE);
  const [removeLikeRequest] = useMutation(REMOVE_LIKE_FROM_LIKEABLE);

  const addLike = async (
    likeableId: string,
    likeableType: string
  ): Promise<AddLikeToLikeablePayload> => {
    try {
      const response = await addLikeRequest({
        variables: { likeableId, likeableType },
        context: getTokenFromLocalStorage.context,
        update: (cache, { data }) => {
          console.log(
            'data.addLikeToLikeable.like returned from addLike mutation: ',
            data.addLikeToLikeable.like
          );
          // console.log(cache.data.data);

          const { getAllStatusUpdatesForAUser } = cache.readQuery({
            query: GET_ALL_STATUS_UPDATES_FOR_A_USER,
          });
          console.log(
            'readQueryResponse log results',
            getAllStatusUpdatesForAUser
          );
        },
      });
      if (
        !response ||
        !response.data ||
        !response.data.addLikeToLikeable ||
        response.data.addLikeToLikeable.errors[0]
      ) {
        throw new Error(response.data.addLikeToLikeable.errors[0]);
      }

      return response.data.addLikeToLikeable;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error adding like');
    }
  };

  const removeLike = async (
    likeableId: string,
    likeableType: string
  ): Promise<RemoveLikeFromLikeablePayload> => {
    try {
      const response = await removeLikeRequest({
        variables: { likeableId, likeableType },
        context: getTokenFromLocalStorage.context,
      });
      if (
        !response ||
        !response.data ||
        !response.data.removeLikeFromLikeable ||
        response.data.removeLikeFromLikeable.errors[0]
      ) {
        throw new Error(response.data.removeLikeFromLikeable.errors[0]);
      }

      return response.data.removeLikeFromLikeable;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error removing like');
    }
  };

  return { addLike, removeLike };
};

export default useAddRemoveLike;
