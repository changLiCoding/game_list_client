import {
  StatusUpdate as StatusUpdateType,
  AddLikeToLikeablePayload,
  RemoveLikeFromLikeablePayload,
} from '@/graphql/__generated__/graphql';

export type ActivityCardProps = {
  isCurrentLiked: boolean;
  statusUpdate: StatusUpdateType;
  daysElapsed: number;
  hoursElapsed: number;
  updateText: JSX.Element;
  addLike: (
    likeableId: string,
    likeableType: string
  ) => Promise<AddLikeToLikeablePayload>;
  removeLike: (
    likeableId: string,
    likeableType: string
  ) => Promise<RemoveLikeFromLikeablePayload>;
};
