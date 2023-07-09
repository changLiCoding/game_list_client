import { useMemo } from 'react';
import { InView } from 'react-intersection-observer';
import {
  FetchMoreQueryOptions,
  ApolloQueryResult,
  OperationVariables,
} from '@apollo/client';
import type {
  StatusUpdate as StatusUpdateType,
  Post as PostType,
  Social as SocialType,
} from '@/graphql/__generated__/graphql';
import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivitiesUpdates.module.scss';
import useAddRemoveLike from '@/services/like/useAddRemoveLike';
import ActivityCard from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivityCard';
import { useAppSelector } from '@/app/hooks';
import getTimeElapsed from '@/utils/getTimeElapsed';

function ActivitiesUpdates({
  fetchMore,
  socials,
  fetchLimitation,
  type,
}: {
  socials: (StatusUpdateType | PostType)[];
  fetchMore: <
    TFetchData = {
      getGlobalSocials: SocialType[];
    },
    TFetchVars extends OperationVariables = {
      limit: number;
      offset: number;
    }
  >(
    fetchMoreOptions: FetchMoreQueryOptions<TFetchVars, TFetchData> & {
      updateQuery: (
        previousQueryResult: TFetchData,
        options: {
          fetchMoreResult?: TFetchData;
          variables?: TFetchVars | undefined;
        }
      ) => TFetchData;
    }
  ) => Promise<ApolloQueryResult<TFetchData>>;
  fetchLimitation: number;
  type?: string | undefined;
}) {
  const { addLike, removeLike } = useAddRemoveLike();
  const userState = useAppSelector((state) => state.user.user);

  const { id: currentUserId } = userState;

  const onFetchMore = async (socialsLength: number) => {
    await fetchMore({
      variables: {
        limit: fetchLimitation + socialsLength,
        offset: socialsLength,
        type,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          getGlobalSocials: [
            ...prev.getGlobalSocials,
            ...fetchMoreResult.getGlobalSocials,
          ],
        };
      },
    });
  };

  const memoizedActivities = useMemo(() => {
    return [...socials].map((activity) => {
      const { daysElapsed, hoursElapsed } = getTimeElapsed(activity.updatedAt);
      const isCurrentLiked = activity.likedUsers.some(
        (user) => user.id === currentUserId
      );
      return (
        <ActivityCard
          isCurrentLiked={isCurrentLiked}
          key={`${activity.__typename}:${activity.id}`}
          activity={activity}
          daysElapsed={daysElapsed}
          hoursElapsed={hoursElapsed}
          currentUserId={currentUserId}
          addLike={addLike}
          removeLike={removeLike}
        />
      );
    });
  }, [socials, currentUserId, addLike, removeLike]);

  return (
    <div className={styles.activitiesUpdatesContainer}>
      {socials.length > 0 && memoizedActivities}
      <InView
        style={{
          height: '100px',
        }}
        as="div"
        onChange={async (inView) => {
          const socialsLength = socials.length;
          if (inView) {
            await onFetchMore(socialsLength);
          }
        }}
      />
    </div>
  );
}

export default ActivitiesUpdates;
