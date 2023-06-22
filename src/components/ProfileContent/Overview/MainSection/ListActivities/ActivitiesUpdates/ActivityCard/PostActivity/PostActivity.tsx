import { Avatar } from 'antd';

import type { Post as PostType } from '@/graphql/__generated__/graphql';

import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivityCard/PostActivity/PostActivity.module.scss';
import useAddRemoveFollowCustomHook from '@/hooks/useAddRemoveFollowCustomHook';

function PostActivity({
  post,
  currentUserId,
}: {
  post: PostType;
  currentUserId: string;
}) {
  const { handleAddFollow, contextHolder: handleFollowContextHolder } =
    useAddRemoveFollowCustomHook();

  return (
    <div className={styles.postActivityContainer}>
      <div className={styles.postActivityHeader}>
        <Avatar
          src={post.userPicture}
          size={50}
          onClick={async () => {
            if (post.userId && post.userId !== currentUserId) {
              await handleAddFollow(post);
            }
          }}
          style={{ cursor: `${post.userId !== currentUserId && 'pointer'}` }}
        />
        {post.username && (
          <a href={`/user/${post.username}`} aria-label={post.username}>
            {' '}
            {post.username}
          </a>
        )}
      </div>
      <div className={styles.postActivityBody}>
        <div>
          <p>{post.text}</p>
        </div>
      </div>
      {handleFollowContextHolder}
    </div>
  );
}

export default PostActivity;
