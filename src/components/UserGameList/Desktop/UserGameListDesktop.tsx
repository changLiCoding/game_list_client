import { Popover, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import styles from '@/components/UserGameList/Desktop/UserGameListDesktop.module.scss';
import type { GameDataType } from '@/components/UserGameList/types';

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
            <img className={styles.ImagePop} src={imageURL} alt="game-large" />
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
];

function UserGameListDesktop({ data }: { data: GameDataType[] }) {
  // const onChange: TableProps<DataType>['onChange'] = (
  //   pagination,
  //   filters,
  //   sorter,
  //   extra
  // ) => {
  //   console.log('params', pagination, filters, sorter, extra);
  // };

  return (
    <Table
      className={styles.Table}
      columns={columns}
      dataSource={data}
      // onChange={onChange}
    />
  );
}

export default UserGameListDesktop;
