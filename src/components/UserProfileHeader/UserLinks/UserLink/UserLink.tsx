import { Link } from 'react-router-dom';

import styles from '@/components/UserProfileHeader/UserLinks/UserLink/UserLink.module.scss';

function UserLink({
  linkName,
  children,
}: {
  linkName: string;
  children: string;
}) {
  return (
    <Link
      to={`/user-profile/${linkName === 'game list' ? 'game-list' : linkName}`}
      className={styles.userLink}
    >
      {children}
    </Link>
  );
}

export default UserLink;
