import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Skeleton } from 'antd';
import { useEffect } from 'react';
import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/ListActivities.module.scss';
import useGlobalStatusUpdates from '@/services/statusUpdate/useGlobalStatusUpdates';
import useGlobalPosts from '@/services/post/useGlobalPosts';
import PostInput from '@/components/ProfileContent/Overview/MainSection/ListActivities/PostInput/PostInput';
import ActivitiesUpdates from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivitiesUpdates';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { setIsUserGameEdited } from '@/features/addedGamesSlice';
import useGlobalSocials from '@/services/social/useGlobalSocials';

function ListActivities() {
  const dispatch = useAppDispatch();

  const { isUserGameEdited, addedList } = useAppSelector(
    (state) => state.addedGames
  );
  // const { getGlobalStatusUpdates, refetch, statusUpdates, loading } =
  //   useGlobalStatusUpdates();

  // const { getGlobalPosts, posts } = useGlobalPosts();

  const {
    socials,
    loading: loadingSocials,
    refetch,
    fetchMore,
  } = useGlobalSocials();

  // useEffect(() => {
  //   if (getGlobalStatusUpdates) {
  //     getGlobalStatusUpdates();
  //   }
  // }, [getGlobalStatusUpdates]);

  // useEffect(() => {
  //   if (getGlobalPosts) {
  //     getGlobalPosts();
  //   }
  // }, [getGlobalPosts]);

  // useEffect(() => {
  //   if (addedList.length > 0) {
  //     refetch();
  //   }
  // }, [addedList, refetch]);

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
  console.log(socials);

  if (loadingSocials) {
    return (
      <div className={styles.listActivitiesContainer}>
        <h2 className={styles.title}>Activities</h2>
        <Skeleton avatar active style={{ margin: '25px auto 25px auto' }} />
        <Skeleton active avatar style={{ marginBottom: '25px' }} />
        <Skeleton active avatar style={{ marginBottom: '25px' }} />
        <Skeleton active avatar style={{ marginBottom: '25px' }} />
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
      <PostInput type="post" />
      <ActivitiesUpdates
        // statusUpdates={statusUpdates}
        // posts={posts}
        socials={socials}
      />
    </div>
  );
}

export default ListActivities;
