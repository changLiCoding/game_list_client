import {
  StatusUpdate as StatusUpdateType,
  AddLikeToLikeablePayload,
} from '@/graphql/__generated__/graphql';

export type ActivityCardProps = {
  statusUpdate: StatusUpdateType;
  daysElapsed: number;
  hoursElapsed: number;
  updateText: string;
  addLike: (
    likeableId: string,
    likeableType: string
  ) => Promise<AddLikeToLikeablePayload>;
};
