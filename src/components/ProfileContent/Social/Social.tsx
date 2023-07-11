import { useEffect, useState } from 'react';
import styles from '@/components/ProfileContent/Social/Social.module.scss';
import FollowLinks from '@/components/ProfileContent/Social/FollowLinks/FollowLinks';
import Follows from '@/components/ProfileContent/Social/Follows/Follows';
import useAllFollows from '@/services/follows/useAllFollows';

function Social() {
  const { getAllFollows, follows, followers, loading } = useAllFollows();

  const [selectedFilter, setSeletedFilter] = useState<
    'Followings' | 'Followers'
  >('Followings');

  useEffect(() => {
    if (getAllFollows) {
      getAllFollows();
    }
  }, [getAllFollows]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.socialContainer}>
      <FollowLinks
        selectedFilter={selectedFilter}
        setSelectedFilter={setSeletedFilter}
      />
      <Follows
        follows={follows}
        followers={followers}
        loading={loading}
        selectedFilter={selectedFilter}
      />
    </div>
  );
}

export default Social;
