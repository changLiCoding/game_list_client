import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/ListActivities.module.scss';
import useStatusUpdates from '@/services/statusUpdate/useStatusUpdates';
import PostInput from '@/components/ProfileContent/Overview/MainSection/ListActivities/PostInput/PostInput';
import ActivitiesUpdates from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivitiesUpdates';
import { useAppSelector } from '@/app/hooks';
import { setIsUserGameEdited } from '@/features/addedGamesSlice';

function ListActivities() {
  const dispatch = useDispatch();

  const { isUserGameEdited, addedList } = useAppSelector(
    (state) => state.addedGames
  );
  const { getAllStatusUpdatesForAUser, refetch, statusUpdates, loading } =
    useStatusUpdates();

  useEffect(() => {
    if (getAllStatusUpdatesForAUser) {
      getAllStatusUpdatesForAUser();
    }
  }, [getAllStatusUpdatesForAUser]);

  useEffect(() => {
    if (addedList.length > 0) {
      refetch();
    }
  }, [addedList, refetch]);

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

  return (
    <div className={styles.listActivitiesContainer}>
      {loading && <div>Loading...</div>}
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
      <PostInput />
      <ActivitiesUpdates statusUpdates={statusUpdates} />
    </div>
  );
}

export default ListActivities;
