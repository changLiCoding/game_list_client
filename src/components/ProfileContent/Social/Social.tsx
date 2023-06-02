import { useEffect, useState } from 'react';
import styles from '@/components/ProfileContent/Social/Social.module.scss';
import FollowLinks from '@/components/ProfileContent/Social/FollowLinks/FollowLinks';
import Follows from '@/components/ProfileContent/Social/Follows/Follows';
import useAllFollows from '@/services/follow/useAllFollows';

function Social() {
  const { getAllFollows, follows, loading, refetch } = useAllFollows();

  const [selectedFilter, setSeletedFilter] = useState('Followings');

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
      <Follows follows={follows} />
    </div>
  );
}

export default Social;
