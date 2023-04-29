import { Popover, Table, Tag } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';
import styles from './UserGameListDesktop.module.css';
import type { DataType } from '@/types/UserGameList';

const columns: ColumnsType<DataType> = [
  {
    title: '',
    dataIndex: 'imageURL',
    width: 100,
    render: (imageURL: string) => (
      <>
        <Popover
          className={styles.PopElement}
          placement="left"
          content={(
            <img
              className={styles.ImagePop}
              src={imageURL}
              alt="game-large"
            />
          )}
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
        {platforms.map((platform: string) => <Tag key={platform}>{platform}</Tag>)}
      </div>
    ),
  },
];

// TODO: Add type to data
const UserGameListDesktop: React.FC<any> = ({ data }) => {
  const onChange: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <Table
      className={styles.Table}
      columns={columns}
      dataSource={data}
      onChange={onChange}
    />
  );
};

export default UserGameListDesktop;
