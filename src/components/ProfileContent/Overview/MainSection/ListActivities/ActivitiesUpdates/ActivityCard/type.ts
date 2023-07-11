import {
  StatusUpdate as StatusUpdateType,
  Post as PostType,
  AddLikeToLikeablePayload,
  RemoveLikeFromLikeablePayload,
} from '@/graphql/__generated__/graphql';

export type ActivityCardProps = {
  isCurrentLiked: boolean;
  activity: PostType | StatusUpdateType;
  daysElapsed: number;
  hoursElapsed: number;
  currentUserId: string;
  addLike: (
    likeableId: string,
    likeableType: string
  ) => Promise<AddLikeToLikeablePayload>;
  removeLike: (
    likeableId: string,
    likeableType: string
  ) => Promise<RemoveLikeFromLikeablePayload>;
};
