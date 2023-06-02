import { useEffect } from 'react';
import styles from '@/components/ProfileContent/Social/Social.module.scss';
import FollowLinks from '@/components/ProfileContent/Social/FollowLinks/FollowLinks';
import Follows from '@/components/ProfileContent/Social/Follows/Follows';
import useAllFollows from '@/services/follow/useAllFollows';

function Social() {
  const { getAllFollows, follows, loading, refetch } = useAllFollows();

  useEffect(() => {
    getAllFollows();
    console.log(follows);
  }, [getAllFollows, follows]);
  return (
    <div className={styles.socialContainer}>
      <FollowLinks />
      <Follows />
    </div>
  );
}

export default Social;
