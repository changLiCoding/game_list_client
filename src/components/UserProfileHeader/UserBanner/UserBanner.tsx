import { InitialStateType } from '@/features/types';
import styles from '@/components/UserProfileHeader/UserBanner/UserBanner.module.scss';

function UserBanner({ userState }: { userState: InitialStateType }) {
  const { user, loading } = userState;

  if (loading || !user) {
    return <div>Loading...</div>;
  }
  return (
    <div
      className={styles.bannerContainerNull}
      style={{ backgroundImage: `url(${user.bannerPicture})` }}
    >
      <div className={styles.bannerImage}>
        <div className={styles.bannerShadow} />
        <div className={styles.imageContainer}>
          <div className={styles.userInfoContainer}>
            <img src={user.userPicture} alt={user.username} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBanner;
