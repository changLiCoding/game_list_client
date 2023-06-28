import { useMutation } from '@apollo/client';

import {
  ADD_LIKE_TO_LIKEABLE,
  GET_ALL_LIKED_GAMES,
  REMOVE_LIKE_FROM_LIKEABLE,
} from '@/services/like/queries';
import { getTokenFromLocalStorage } from '@/constants';
import type {
  AddLikeToLikeablePayload,
  Like,
  RemoveLikeFromLikeablePayload,
} from '@/graphql/__generated__/graphql';

const useAddRemoveLike = () => {
  const [addLikeRequest] = useMutation(ADD_LIKE_TO_LIKEABLE);
  const [removeLikeRequest] = useMutation(REMOVE_LIKE_FROM_LIKEABLE);

  type QueryResultAllLikedGames = {
    getAllLikedGames: Like[];
  };

  const addLike = async (
    likeableId: string,
    likeableType: string
  ): Promise<AddLikeToLikeablePayload> => {
    try {
      const response = await addLikeRequest({
        variables: { likeableId, likeableType },
        context: getTokenFromLocalStorage(),
        update: (cache, { data }) => {
          const queryResult: QueryResultAllLikedGames | null = cache.readQuery({
            query: GET_ALL_LIKED_GAMES,
          });
          if (queryResult && queryResult.getAllLikedGames) {
            cache.writeQuery({
              query: GET_ALL_LIKED_GAMES,
              data: {
                getAllLikedGames: [
                  data.addLikeToLikeable.like,
                  ...queryResult.getAllLikedGames,
                ],
              },
            });
          }
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
        context: getTokenFromLocalStorage(),
        update: (cache, { data }) => {
          const queryResult: QueryResultAllLikedGames | null = cache.readQuery({
            query: GET_ALL_LIKED_GAMES,
          });

          if (queryResult && queryResult.getAllLikedGames) {
            const { getAllLikedGames } = queryResult;
            const newGetAllLikedGames = getAllLikedGames.filter(
              (like: Like) =>
                like.likeable?.__typename === 'Game' &&
                like.id !== data.removeLikeFromLikeable.like.id
            );

            cache.writeQuery({
              query: GET_ALL_LIKED_GAMES,
              data: { getAllLikedGames: newGetAllLikedGames },
            });
          }
        },
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
