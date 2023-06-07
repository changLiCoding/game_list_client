import { Button } from 'antd';
import { useDispatch } from 'react-redux';

import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/PostInput/PostInput.module.scss';
import { useAppSelector } from '@/app/hooks';
import { setPost } from '@/features/userPostSlice';
import usePosts from '@/services/post/usePosts';

function PostInput() {
  const dispatch = useDispatch();
  const { post } = useAppSelector((state) => state.userPost);

  const { createPost } = usePosts();

  return (
    <div className={styles.postInputContainer}>
      <textarea
        value={post}
        autoComplete="off"
        placeholder="Post Something..."
        className={styles.postTextarea}
        onChange={(e) => {
          dispatch(setPost(e.target.value));
        }}
      />
      <div className={styles.postConfirmContainer}>
        <Button>Cancel</Button>
        <Button
          onClick={async () => {
            if (createPost && post) {
              console.log(post);

              const response = await createPost(post);
              console.log(response);
            }
          }}
        >
          Post
        </Button>
      </div>
    </div>
  );
}

export default PostInput;
