import { Badge, List } from 'antd';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import styles from './AvailableListsStyle.module.scss';
import { useAppSelector } from '@/app/hooks';
import useGamesByStatus from '@/services/userGames/useGamesByStatus';
import { setUserGameFilters } from '@/app/store';
import { SelectedListTypes } from '@/types/global';
import { DataList } from './types';

function AvailableLists() {
  const dispatch = useDispatch();
  const gameFilters = useAppSelector((state) => state.userGameFilters);
  const listOrder = useAppSelector((state) => state.userGames);

  const { gamesByStatusForAUser } = useGamesByStatus();

  const data: DataList[] = useMemo(() => {
    const dataArray: DataList[] = [
      {
        name: 'Planning',
        value: 'planning',
        count: gamesByStatusForAUser?.gamesByStatusForAUser?.planningCount ?? 0,
      },
      {
        name: 'Playing',
        value: 'playing',
        count: gamesByStatusForAUser?.gamesByStatusForAUser?.playingCount ?? 0,
      },
      {
        name: 'Paused',
        value: 'paused',
        count: gamesByStatusForAUser?.gamesByStatusForAUser?.pausedCount ?? 0,
      },
      {
        name: 'Completed',
        value: 'completed',
        count:
          gamesByStatusForAUser?.gamesByStatusForAUser?.completedCount ?? 0,
      },
      {
        name: 'Dropped',
        value: 'dropped',
        count: gamesByStatusForAUser?.gamesByStatusForAUser?.droppedCount ?? 0,
      },
    ];

    const newArray = listOrder.listOrder
      .map((value) => dataArray.find((item) => item.value === value))
      .filter((item) => item && item.count > 0) as DataList[];
    newArray.unshift({
      name: 'All',
      value: 'all',
      count: dataArray.reduce((acc, curr) => acc + curr.count, 0),
    });

    return newArray ?? [];
  }, [
    gamesByStatusForAUser?.gamesByStatusForAUser?.completedCount,
    gamesByStatusForAUser?.gamesByStatusForAUser?.droppedCount,
    gamesByStatusForAUser?.gamesByStatusForAUser?.pausedCount,
    gamesByStatusForAUser?.gamesByStatusForAUser?.planningCount,
    gamesByStatusForAUser?.gamesByStatusForAUser?.playingCount,
    listOrder.listOrder,
  ]);

  const handleItemClick = (item: SelectedListTypes) => {
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
            gameFilters.selectedList === item.name.toLowerCase()
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
