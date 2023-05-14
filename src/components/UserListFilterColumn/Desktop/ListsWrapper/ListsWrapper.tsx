import { DownOutlined, SaveOutlined, UpOutlined } from '@ant-design/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import ReorderLists from '../ReorderLists';
import AvailableLists from '../AvailableLists';
import styles from './ListsWrapperStyle.module.scss';
import {
  resetLocalListOrder,
  setListOrder,
} from '@/features/userUserGamesListSlice';

function ListsWrapper() {
  const dispatch = useDispatch();
  const [listStyles, setListStyles] = React.useState<boolean>(false);

  const handleSaveListOrder = () => {
    // TODO: Send request to backend to save list order
    dispatch(setListOrder());
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
            <SaveOutlined onClick={handleSaveListOrder} />
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
