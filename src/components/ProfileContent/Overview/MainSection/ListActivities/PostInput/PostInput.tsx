import { Button } from 'antd';

import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/PostInput/PostInput.module.scss';

function PostInput() {
  return (
    <div className={styles.postInputContainer}>
      <textarea
        autoComplete="off"
        placeholder="Post Something..."
        className={styles.postTextarea}
      />
      <div className={styles.postConfirmContainer}>
        <Button>Cancel</Button>
        <Button>Post</Button>
      </div>
    </div>
  );
}

export default PostInput;
