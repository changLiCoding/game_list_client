import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/ListActivities.module.scss';
import useStatusUpdates from '@/services/statusUpdate/useStatusUpdates';

import PostInput from '@/components/ProfileContent/Overview/MainSection/ListActivities/PostInput/PostInput';
import ActivitiesUpdates from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivitiesUpdates';

function ListActivities() {
  const { statusUpdates, loading } = useStatusUpdates();

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
