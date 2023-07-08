import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/ListActivities.module.scss';
import PostInput from '@/components/ProfileContent/Overview/MainSection/ListActivities/PostInput/PostInput';
import ActivitiesUpdates from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivitiesUpdates';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { setIsUserGameEdited } from '@/features/addedGamesSlice';
import { ListActivitiesProps } from './ListactivitesType';

function ListActivities({
  socials,
  loading: loadingSocials,
  refetch,
  fetchMore,
  fetchLimitation,
  type,
}: ListActivitiesProps) {
  const dispatch = useAppDispatch();

  const { isUserGameEdited } = useAppSelector((state) => state.addedGames);

  const [post, setPost] = useState<string>('');

  useEffect(() => {
    if (isUserGameEdited) {
      refetch();
      dispatch(setIsUserGameEdited({ type: 'reset' }));
    }
  }, [refetch, isUserGameEdited, dispatch]);

  const items: MenuProps['items'] = [
    {
      label: 'All',
      key: '0',
    },
    {
      label: 'List',
      key: '1',
    },
    {
      label: 'Posts',
      key: '3',
    },
  ];

  if (loadingSocials) {
    return (
      <div className={styles.listActivitiesContainer}>
        <h2 className={styles.title}>Activities</h2>
        {Array.from({ length: 10 }, (_, index) => (
          <Skeleton
            avatar
            active
            key={index}
            style={{ margin: '25px auto 25px auto' }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.listActivitiesContainer}>
      <h2 className={styles.title}>
        Activities
        <Dropdown
          overlayClassName="dropdownFilter"
          menu={{ items }}
          trigger={['click']}
          arrow
        >
          <Space>
            Filter <DownOutlined />
          </Space>
        </Dropdown>
      </h2>
      <PostInput post={post} setPost={setPost} />
      <ActivitiesUpdates
        fetchLimitation={fetchLimitation}
        socials={socials}
        fetchMore={fetchMore}
        type={type}
      />
    </div>
  );
}

export default ListActivities;
