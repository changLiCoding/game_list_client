import { Button } from 'antd';
import { useDispatch } from 'react-redux';

import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/PostInput/PostInput.module.scss';
import { useAppSelector } from '@/app/hooks';
import useNotification from '@/hooks/useNotification';
import { setPost } from '@/features/userPostSlice';
import usePosts from '@/services/post/usePosts';

type PostInputProps = {
  comment?: string;
  setComment?: React.Dispatch<React.SetStateAction<string>>;
  type?: 'comment' | 'post';
};

function PostInput({ comment, setComment, type }: PostInputProps) {
  const dispatch = useDispatch();
  const { post } = useAppSelector((state) => state.userPost);

  const { createPost } = usePosts();

  const { success, contextHolder, warning } = useNotification();

  return (
    <div className={styles.postInputContainer}>
      <textarea
        value={type === 'comment' ? comment : post}
        autoComplete="off"
        placeholder={`${type} something...`}
        className={styles.postTextarea}
        onChange={(e) => {
          if (type === 'comment' && setComment) {
            setComment(e.target.value);
          } else if (type === 'post') {
            dispatch(setPost(e.target.value));
          }
        }}
      />
      <div className={styles.postConfirmContainer}>
        <Button
          onClick={() => {
            if (type === 'comment' && setComment) {
              setComment('');
            } else if (type === 'post') {
              dispatch(setPost(''));
            }
          }}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={async () => {
            if (type === 'post' && createPost && post) {
              const response = await createPost(post);
              if (response?.post && response?.errors?.length === 0) {
                success(`You have posted successfully.`);
                dispatch(setPost(''));
              } else {
                warning(`Can not post. ${response.errors}!`);
              }
            } else if (type === 'comment' && setComment && comment) {
              console.log(comment);
              setComment('');
            }
          }}
        >
          Post
        </Button>
      </div>
      {contextHolder}
    </div>
  );
}

export default PostInput;
