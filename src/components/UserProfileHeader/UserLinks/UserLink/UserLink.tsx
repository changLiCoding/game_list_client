import { useParams } from 'react-router-dom';

import styles from '@/components/UserProfileHeader/UserLinks/UserLink/UserLink.module.scss';

function UserLink({ children }: { children: string }) {
  const { username } = useParams();
  return (
    <a
      href={`/user-profile/${username}/${
        children === 'Overview' ? '' : children
      }`}
      className={styles.userLink}
    >
      {children}
    </a>
  );
}

export default UserLink;
