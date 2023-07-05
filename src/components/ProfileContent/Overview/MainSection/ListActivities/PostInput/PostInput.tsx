import { Button } from 'antd';
import { useEffect, useRef, memo } from 'react';

import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/PostInput/PostInput.module.scss';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import useNotification from '@/hooks/useNotification';
import { setPost } from '@/features/userPostSlice';
import usePosts from '@/services/post/usePosts';
import useAddRemoveComment from '@/services/comments/useAddRemoveComment';

type PostInputProps = {
  comment?: string;
  setComment?: React.Dispatch<React.SetStateAction<string>>;
  type?: 'comment' | 'post';
  commentType?: string;
  commentId?: string;
};

function PostInput({
  comment,
  setComment,
  type,
  commentType,
  commentId,
}: PostInputProps) {
  const dispatch = useAppDispatch();
  const postRef = useRef<HTMLTextAreaElement>(null);
  const countRef = useRef<number>(0);

  countRef.current += 1;
  console.log('PostInput rendered: ', countRef.current);

  const { post } = useAppSelector((state) => state.userPost);

  const { createPost } = usePosts();
  const { addComment } = useAddRemoveComment();

  const { success, contextHolder, warning } = useNotification();

  useEffect(() => {
    if (type === 'post' && postRef.current) {
      postRef.current.focus();
    }
  }, [type]);

  return (
    <div className={styles.postInputContainer}>
      <textarea
        ref={postRef}
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
            } else if (
              type === 'comment' &&
              setComment &&
              comment &&
              commentId &&
              commentType
            ) {
              const response = await addComment(
                commentId,
                commentType,
                comment
              );
              if (response?.comment && response?.errors?.length === 0) {
                success(`Your comment about has been posted successfully.`);
              } else {
                warning(`Can not post comment. ${response.errors}!`);
              }
              setComment('');
            }
          }}
        >
          {type === 'post' ? 'Post' : 'Comment'}
        </Button>
      </div>
      {contextHolder}
    </div>
  );
}

const MemoizedPostInput = memo(PostInput);

export default MemoizedPostInput;
