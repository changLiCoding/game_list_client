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
import { Avatar, Button, Popover, Modal, Input } from 'antd';
import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivitiesUpdates.module.scss';
import type {
  User as UserType,
  Comment as CommentType,
} from '@/graphql/__generated__/graphql';
import type { ActivityCardProps } from './type';
import useAddRemoveFollow from '@/services/follows/useAddRemoveFollow';
import useAddRemoveComment from '@/services/comments/useAddRemoveComment';
import useNotification from '@/hooks/useNotification';
import StatusUpdateActivity from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivityCard/StatusUpdateActivity';
import PostActivity from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivityCard/PostActivity';
import getTimeElapsed from '@/utils/getTimeElapsed';
import CommentInputWrapper from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivityCard/CommentInputWrapper';
import useEditComment from '@/services/comments/useEditComment';

function ActivityCard({
  isCurrentLiked,
  activity,
  daysElapsed,
  hoursElapsed,
  addLike,
  removeLike,
  currentUserId,
}: ActivityCardProps) {
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

  const { removeComment } = useAddRemoveComment();
  const { addFollow } = useAddRemoveFollow();
  const { editComment } = useEditComment();
  const { success, contextHolder, warning } = useNotification();

  const [isCommentVisible, setIsCommentVisible] = useState(
    activity.comments.length > 0
  );

  const handleAddFollow = async (commentInput: CommentType) => {
    Modal.confirm({
      title: `Are you sure you want to follow ${commentInput.user.username}?`,
      content: 'You will see their posts in your feed.',
      onOk: async () => {
        const response = await addFollow(commentInput.user.id as string);
        if (response?.follow && response?.errors?.length === 0) {
          success(
            `You have followed ${commentInput.user.username} successfully.`
          );
        } else {
          warning(`Can not follow ${commentInput.user.username}. ${response}!`);
        }
      },
    });
  };

  const handleRemoveComment = async (commentInput: CommentType) => {
    Modal.confirm({
      title: `Are you sure you want to remove this comment?`,
      content: 'You will not see this comment anymore.',
      onOk: async () => {
        const response = await removeComment(
          commentInput.commentableId,
          commentInput.commentableType,
          commentInput.id as string
        );
        if (response?.comment && response?.errors?.length === 0) {
          success(`You have removed this comment successfully.`);
        } else {
          warning(`Can not remove this comment. ${response}!`);
        }
      },
    });
  };

  const handleEditComment = async (commentInput: CommentType) => {
    Modal.confirm({
      title: `Edit your comment`,
      content: (
        <div>
          <Input.TextArea
            // value={state}
            className="comment-editor"
            autoSize
            defaultValue={commentInput.body}
          />
          {contextHolder}
        </div>
      ),
      onOk: async () => {
        const commentEditor = document.getElementsByClassName(
          'comment-editor'
        )[0] as HTMLTextAreaElement;
        const response = await editComment(
          commentInput.id,
          commentEditor.value
        );
        if (response?.comment && response?.errors?.length === 0) {
          success(`You have edited this comment successfully.`);
        } else {
          warning(`Can not edit this comment. ${response}!`);
        }
      },
    });
  };

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
                        } else if (
                          comment.user.id &&
                          comment.user.id !== currentUserId
                        ) {
                          warning('You can not edit other"s comment.');
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
                        } else if (
                          comment.user.id &&
                          comment.user.id !== currentUserId
                        ) {
                          warning('You can not remove other"s comment.');
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
      {contextHolder}
    </div>
  );
}

export default ActivityCard;
