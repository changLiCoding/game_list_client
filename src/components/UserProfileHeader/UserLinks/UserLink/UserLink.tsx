import { Link, useLocation } from 'react-router-dom';

import styles from '@/components/UserProfileHeader/UserLinks/UserLink/UserLink.module.scss';

function UserLink({
  selected,
  onClick,
  linkName,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  linkName: string;
  children: string;
}) {
  const location = useLocation();
  const link = location.pathname.split('/').pop();

  return (
    <Link
      to={`/user-profile/${linkName === 'Overview' ? '' : linkName}`}
      className={`${styles.userLink} ${
        (link === linkName ||
          (link === 'user-profile' && linkName === 'overview')) &&
        styles.activeLink
      }`}
    >
      {children}
    </Link>
  );
}

export default UserLink;
