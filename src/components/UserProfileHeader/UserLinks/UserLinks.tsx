import styles from '@/components/UserProfileHeader/UserLinks/UserLinks.module.scss';
import UserLink from '@/components/UserProfileHeader/UserLinks/UserLink/UserLink';

function UserLinks() {
  return (
    <div className={styles.navWrap}>
      <div className={styles.navContainer}>
        <UserLink linkName="overview">Overview</UserLink>
        <UserLink linkName="game-list">Game List</UserLink>
        <UserLink linkName="favorites">Favorites</UserLink>
        <UserLink linkName="social">Social</UserLink>
        <UserLink linkName="reviews">Reviews</UserLink>
      </div>
    </div>
  );
}

export default UserLinks;
