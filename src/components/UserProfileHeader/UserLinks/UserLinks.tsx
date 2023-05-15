import styles from '@/components/UserProfileHeader/UserLinks/UserLinks.module.scss';
import UserLink from '@/components/UserProfileHeader/UserLinks/UserLink/UserLink';

function UserLinks() {
  return (
    <div className={styles.navWrap}>
      <div className={styles.navContainer}>
        <UserLink>Overview</UserLink>
        <UserLink>Game List</UserLink>
        <UserLink>Favorites</UserLink>
        <UserLink>Social</UserLink>
        <UserLink>Reviews</UserLink>
      </div>
    </div>
  );
}

export default UserLinks;
