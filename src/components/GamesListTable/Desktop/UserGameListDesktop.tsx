import { Popover, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import styles from '@/components/GamesListTable/Desktop/UserGameListDesktop.module.scss';
import type {
  GameDataType,
  UserGameListDataType,
} from '@/components/GamesListTable/types';

const columns: ColumnsType<GameDataType> = [
  {
    title: '',
    dataIndex: 'imageURL',
    width: 80,
    render: (imageURL: string) => (
      <>
        <Popover
          placement="left"
          content={
            <img className={styles.ImagePop} src={imageURL} alt="game-large" />
          }
          className={styles.PopElement}
          overlayInnerStyle={{
            backgroundColor: 'transparent',
            boxShadow: 'none',
          }}
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
    width: 300,
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 3,
    },
    render: (name: string, record) => (
      <Link
        to={`/game-detail/${record.id}/${name}`}
        className={styles.nameContainer}
      >
        {name}
      </Link>
    ),
  },
  {
    title: 'Score',
    dataIndex: 'avgScore',
    width: 100,
    sorter: {
      compare: (a, b) =>
        (a as { avgScore: number }).avgScore -
        (b as { avgScore: number }).avgScore,
      multiple: 3,
    },
  },
  {
    title: 'Platforms',
    dataIndex: 'platforms',
    width: 300,
    render: (platforms: string[]) => (
      <div className={styles.TagsContainer}>
        {platforms.map((platform: string) => (
          <Tag className={styles.TagStyle} key={platform}>
            {platform}
          </Tag>
        ))}
      </div>
    ),
  },
];

function UserGameListDesktop({ data }: UserGameListDataType) {
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
