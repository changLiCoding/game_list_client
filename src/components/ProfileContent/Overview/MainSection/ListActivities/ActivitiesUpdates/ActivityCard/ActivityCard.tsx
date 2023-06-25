import { useState } from 'react';
import {
  CloseOutlined,
  HeartFilled,
  HeartOutlined,
  MessageFilled,
  MessageOutlined,
  UserOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Popover } from 'antd';
import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivitiesUpdates.module.scss';
import type { User as UserType } from '@/graphql/__generated__/graphql';
import type { ActivityCardProps } from './type';
import useAddRemoveCommentCustomHook from '@/hooks/useAddRemoveCommentCustomHook';
import StatusUpdateActivity from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivityCard/StatusUpdateActivity';
import PostActivity from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivityCard/PostActivity';
import getTimeElapsed from '@/utils/getTimeElapsed';
import CommentInputWrapper from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivityCard/CommentInputWrapper';
import useAddRemoveFollowCustomHook from '@/hooks/useAddRemoveFollowCustomHook';

function ActivityCard({
  isCurrentLiked,
  activity,
  daysElapsed,
  hoursElapsed,
  addLike,
  removeLike,
  currentUserId,
}: ActivityCardProps): JSX.Element {
  const likedAvatar = (likedUsers: UserType[]) => {
    return (
      <Avatar.Group maxCount={3}>
        {likedUsers.map((user) => (
          <Avatar
            icon={<UserOutlined />}
            key={user.id}
            src={user.userPicture}
          />
        ))}
      </Avatar.Group>
    );
  };

  const {
    handleRemoveComment,
    handleEditComment,
    contextHolder: commentContext,
  } = useAddRemoveCommentCustomHook();
  const { handleAddFollow } = useAddRemoveFollowCustomHook();
  const [isCommentVisible, setIsCommentVisible] = useState<boolean>(
    activity.comments.length > 0
  );

  return (
    <div
      className={`${styles.activity} ${
        activity.__typename === 'Post' && styles.postActivity
      }`}
    >
      <div className={styles.activityContent}>
        {activity.__typename === 'StatusUpdate' && (
          <StatusUpdateActivity
            statusUpdate={activity}
            currentUserId={currentUserId}
          />
        )}

        {activity.__typename === 'Post' && (
          <PostActivity post={activity} currentUserId={currentUserId} />
        )}
        <div className={styles.time}>
          {daysElapsed > 0 ? `${daysElapsed} days` : `${hoursElapsed} hours`}{' '}
          ago
        </div>
        <div className={styles.actions}>
          <Popover
            placement="bottom"
            arrow={false}
            trigger="hover"
            content={() => likedAvatar(activity.likedUsers as UserType[])}
            overlayInnerStyle={{
              backgroundColor: 'transparent',
              boxShadow: 'none',
              marginTop: '-10px',
              paddingTop: '0px',
            }}
          >
            <Button
              type="ghost"
              onClick={async () => {
                if (isCurrentLiked) {
                  await removeLike(activity.id, activity.__typename as string);
                } else {
                  await addLike(activity.id, activity.__typename as string);
                }
              }}
              icon={
                isCurrentLiked ? (
                  <HeartFilled className={styles.liked} />
                ) : (
                  <HeartOutlined className={styles.notLiked} />
                )
              }
            />
          </Popover>

          <span
            className={`${styles.likeCount} ${
              activity.likesCount === 0 && styles.zeroCount
            }`}
          >
            {activity.likesCount}
          </span>
          <div>
            {isCommentVisible ? (
              <MessageFilled
                className={styles.liked}
                onClick={() => {
                  setIsCommentVisible(!isCommentVisible);
                }}
              />
            ) : (
              <MessageOutlined
                className={styles.notLiked}
                onClick={() => {
                  setIsCommentVisible(!isCommentVisible);
                }}
              />
            )}
          </div>
          <span
            className={`${styles.likeCount} ${
              activity.comments.length === 0 && styles.zeroCount
            }`}
          >
            {activity.comments.length}
          </span>
        </div>
      </div>
      <div
        className={styles.replyContainer}
        style={{ display: `${isCommentVisible ? 'block' : 'none'}` }}
      >
        <div className={styles.activityReply}>
          {activity.comments.map((comment) => {
            const {
              daysElapsed: commentDaysElapsed,
              hoursElapsed: commentHoursElapsed,
            } = getTimeElapsed(comment.updatedAt);
            return (
              <div key={comment.id} className={styles.replyList}>
                <div className={styles.replyAvatar}>
                  <Avatar
                    src={comment.user.userPicture}
                    size={50}
                    onClick={async () => {
                      if (
                        comment.user.id &&
                        comment.user.id !== currentUserId
                      ) {
                        await handleAddFollow(comment);
                      }
                    }}
                    style={{
                      cursor: `${
                        comment.user.id !== currentUserId && 'pointer'
                      }`,
                    }}
                  />
                  {comment.user.username && (
                    <a
                      href={`/user/${comment.user.username}`}
                      aria-label={comment.user.username}
                    >
                      {' '}
                      {comment.user.username}
                    </a>
                  )}
                  <div className={styles.replyActions}>
                    <EditOutlined
                      className={`${styles.replyRemove} ${
                        comment.user.id === currentUserId &&
                        styles.replyRemoveVisible
                      }`}
                      onClick={async () => {
                        if (
                          comment.user.id &&
                          comment.user.id === currentUserId
                        ) {
                          await handleEditComment(comment);
                        }
                      }}
                    />
                    <CloseOutlined
                      className={`${styles.replyRemove} ${
                        comment.user.id === currentUserId &&
                        styles.replyRemoveVisible
                      }`}
                      onClick={async () => {
                        if (
                          comment.user.id &&
                          comment.user.id === currentUserId
                        ) {
                          await handleRemoveComment(comment);
                        }
                      }}
                    />
                    <div className={styles.time}>
                      {commentDaysElapsed > 0
                        ? `${commentDaysElapsed} days`
                        : `${commentHoursElapsed} hours`}{' '}
                      ago
                    </div>
                  </div>
                </div>
                <div className={styles.replyBody}>
                  <div>
                    <p>{comment.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <CommentInputWrapper
            commentType={activity.__typename}
            commentId={activity.id}
          />
        </div>
      </div>
      {commentContext}
    </div>
  );
}

export default ActivityCard;
