import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import styles from './UserGameListMobile.module.scss';
import type { GameDataType } from '@/components/UserGameList/types';

const columns: ColumnsType<GameDataType> = [
  {
    title: '',
    dataIndex: 'imageURL',
    width: 100,
    render: (imageURL: string) => (
      <img className={styles.ImageSmall} src={imageURL} alt="game" />
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 3,
    },
    render: (name: string, record) => (
      <div>
        <p>{name}</p>
        <p>{record.avgScore}</p>
      </div>
    ),
  },
  {
    title: 'Platforms',
    dataIndex: 'platforms',
    render: (platforms: string[]) => (
      <div className={styles.TagsContainer}>
        {platforms.map((platform: string) => (
          <Tag
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100px',
            }}
            key={platform}
          >
            {platform}
          </Tag>
        ))}
      </div>
    ),
  },
];

function UserGameListMobile({ data }: { data: GameDataType[] }) {
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

export default UserGameListMobile;
