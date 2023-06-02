import { DownOutlined, SaveOutlined, UpOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './ListsWrapperStyle.module.scss';
import {
  resetLocalListOrder,
  setListOrder,
} from '@/features/userGamesListSlice';
import useEditListsOrder from '@/services/user/useEditListsOrder';
import { useAppSelector } from '@/app/hooks';
import ReorderLists from '@/components/UserListFilterColumn/Desktop/ReorderLists';
import AvailableLists from '@/components/UserListFilterColumn/Desktop/AvailableLists';

function ListsWrapper() {
  const dispatch = useDispatch();
  const { editNewListsOrder } = useEditListsOrder();

  const localListOrder = useAppSelector(
    (state) => state.userGames.localListOrder
  );
  const [listStyles, setListStyles] = useState<boolean>(false);

  const handleSaveListOrder = () => {
    editNewListsOrder(localListOrder.join(','), 'lists_order');
    dispatch(setListOrder());
    setListStyles((prev) => !prev);
  };

  const handleOrderToAvailableLists = () => {
    dispatch(resetLocalListOrder());
    setListStyles((prev) => !prev);
  };

  return (
    <>
      <div className={styles.multiListStyle}>
        <p>Lists</p>
        {listStyles ? (
          <div className={styles.saveIcons}>
            <UpOutlined
              data-testid="up-arrow"
              onClick={() => setListStyles((prev) => !prev)}
            />
            <SaveOutlined
              data-testid="save-button"
              onClick={handleSaveListOrder}
            />
          </div>
        ) : (
          <DownOutlined
            data-testid="down-arrow"
            onClick={handleOrderToAvailableLists}
          />
        )}
      </div>
      <div className={styles.multiLists}>
        {listStyles ? <ReorderLists /> : <AvailableLists />}
      </div>
    </>
  );
}

export default ListsWrapper;
