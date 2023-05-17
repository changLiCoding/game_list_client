import { Link, useParams } from 'react-router-dom';

import styles from '@/components/UserProfileHeader/UserLinks/UserLink/UserLink.module.scss';

function UserLink({ children }: { children: string }) {
  const { username } = useParams();
  return (
    <Link
      to={`/user-profile/${username}/${
        children === 'Overview' ? '' : children
      }`}
      className={styles.userLink}
    >
      {children}
    </Link>
  );
}

export default UserLink;
