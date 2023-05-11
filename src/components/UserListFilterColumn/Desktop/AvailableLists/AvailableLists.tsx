import React from 'react';
import { Badge, List } from 'antd';
import { useDispatch } from 'react-redux';
import styles from './AvailableListsStyle.module.scss';
import { setSelectedList } from '@/features/userUserGamesListSlice';
import { useAppSelector } from '@/app/hooks';

function AvailableLists() {
  const dispatch = useDispatch();
  // const [selectedItem, setSelectedItem] = useState<string>('All');
  const selectedItem = useAppSelector((state) => state.userGames.selectedList);
  const data = ['All', 'Planning', 'Playing'];

  const handleItemClick = (item: string) => {
    // setSelectedItem(item);
    dispatch(setSelectedList(item.toLowerCase()));
  };
  return (
    <List
      dataSource={data}
      className={styles.listStyle}
      renderItem={(item) => (
        <List.Item
          // className={styles.listItem}
          onClick={() => handleItemClick(item)}
          style={
            selectedItem === item.toLowerCase()
              ? { backgroundColor: '#f7f5f5' }
              : {}
          }
        >
          <div className={styles.listName}>
            <p>{item}</p>
            <Badge count={11} showZero color="#d4cfc1" />
          </div>
        </List.Item>
      )}
    />
  );
}

export default AvailableLists;
