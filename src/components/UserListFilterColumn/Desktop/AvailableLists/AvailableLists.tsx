import { Badge, List } from 'antd';
import { useDispatch } from 'react-redux';
import styles from './AvailableListsStyle.module.scss';
import { setSelectedList } from '@/features/userUserGamesListSlice';
import { useAppSelector } from '@/app/hooks';
import useGamesByStatus from '@/services/userGames/useGamesByStatus';
import { setUserGameFilters } from '@/app/store';
import { SelectedListTypes } from '@/types/global';
import { DataList } from './types';

function AvailableLists() {
  const dispatch = useDispatch();
  // const selectedItem = useAppSelector((state) => state.userGames.selectedList);
  const selectedItem = useAppSelector(
    (state) => state.userGameFilters.selectedList
  );

  const { gamesByStatusForAUser } = useGamesByStatus();

  const data: DataList[] = [];
  if (gamesByStatusForAUser?.gamesByStatusForAUser?.totalCount) {
    data.push({
      name: 'All',
      value: 'all',
      count: gamesByStatusForAUser?.gamesByStatusForAUser?.totalCount,
    });
  }
  if (gamesByStatusForAUser?.gamesByStatusForAUser?.planningCount) {
    data.push({
      name: 'Planning',
      value: 'planning',
      count: gamesByStatusForAUser?.gamesByStatusForAUser?.planningCount,
    });
  }
  if (gamesByStatusForAUser?.gamesByStatusForAUser?.playingCount) {
    data.push({
      name: 'Playing',
      value: 'playing',
      count: gamesByStatusForAUser?.gamesByStatusForAUser?.playingCount,
    });
  }
  if (gamesByStatusForAUser?.gamesByStatusForAUser?.completedCount) {
    data.push({
      name: 'Completed',
      value: 'completed',
      count: gamesByStatusForAUser?.gamesByStatusForAUser?.completedCount,
    });
  }
  if (gamesByStatusForAUser?.gamesByStatusForAUser?.pausedCount) {
    data.push({
      name: 'Paused',
      value: 'paused',
      count: gamesByStatusForAUser?.gamesByStatusForAUser?.pausedCount,
    });
  }
  if (gamesByStatusForAUser?.gamesByStatusForAUser?.droppedCount) {
    data.push({
      name: 'Dropped',
      value: 'dropped',
      count: gamesByStatusForAUser?.gamesByStatusForAUser?.droppedCount,
    });
  }

  const handleItemClick = (item: SelectedListTypes) => {
    dispatch(setSelectedList(item.toLowerCase()));
    dispatch(setUserGameFilters({ selectedList: item }));
  };

  return (
    <List
      dataSource={data}
      className={styles.listStyle}
      renderItem={(item) => (
        <List.Item
          data-testid={`listitem-${item.name}`}
          onClick={() => handleItemClick(item.value)}
          style={
            selectedItem === item.name.toLowerCase()
              ? { backgroundColor: '#e0ddd3' }
              : {}
          }
        >
          <div className={styles.listName}>
            <p>{item.name}</p>
            <Badge count={item.count} showZero color="rgb(63, 114, 175)" />
          </div>
        </List.Item>
      )}
    />
  );
}

export default AvailableLists;
