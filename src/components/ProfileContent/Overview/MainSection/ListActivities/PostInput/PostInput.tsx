import { Input } from 'antd';

import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/PostInput/PostInput.module.scss';

function PostInput() {
  return (
    <div className={styles.postInputContainer}>
      <Input size="large" placeholder="Post Something" />
    </div>
  );
}

export default PostInput;
