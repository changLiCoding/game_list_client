import { Button, Popover, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useDispatch } from 'react-redux';
import styles from './UserGameListDesktopDelete.module.scss';
import type { GameDataType } from '@/components/UserGameList/types';
import useUserGames from '@/services/userGames/useUserGames';
import { deleteUserGames } from '@/features/userGamesSlice';

function UserGameListDesktopDelete({ data }: { data: GameDataType[] }) {
  const dispatch = useDispatch();
  const { deleteUserGames: deleteUserGameRequest, refetch } = useUserGames();
  // const onChange: TableProps<DataType>['onChange'] = (
  //   pagination,
  //   filters,
  //   sorter,
  //   extra
  // ) => {
  //   console.log('params', pagination, filters, sorter, extra);
  // };

  const deleteGame = async (id: string) => {
    dispatch(deleteUserGames(id));
    const result = await deleteUserGameRequest(parseInt(id, 10));
    if (result && result?.errors && result?.errors?.length > 0) {
      refetch();
    }
    console.log('result', result);
  };

  const columns: ColumnsType<GameDataType> = [
    {
      title: '',
      dataIndex: 'imageURL',
      width: 100,
      render: (imageURL: string) => (
        <>
          <Popover
            className={styles.PopElement}
            placement="left"
            content={
              <img
                className={styles.ImagePop}
                src={imageURL}
                alt="game-large"
              />
            }
          >
            <img className={styles.Image} src={imageURL} alt="game" />
          </Popover>
          <img className={styles.ImageSmall} src={imageURL} alt="game" />
        </>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 3,
      },
    },
    {
      title: 'Average Score',
      dataIndex: 'avgScore',
      sorter: {
        compare: (a, b) => a.avgScore - b.avgScore,
        multiple: 3,
      },
    },
    {
      title: 'Platforms',
      dataIndex: 'platforms',
      render: (platforms: string[]) => (
        <div className={styles.TagsContainer}>
          {platforms.map((platform: string) => (
            <Tag key={platform}>{platform}</Tag>
          ))}
        </div>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      render: (index) => (
        <Button onClick={() => deleteGame(index)}>Delete</Button>
      ),
    },
  ];

  return (
    <Table
      className={styles.Table}
      columns={columns}
      dataSource={data}
      // onChange={onChange}
    />
  );
}

export default UserGameListDesktopDelete;
