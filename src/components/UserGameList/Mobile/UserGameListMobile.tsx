import type { DataType } from "@/types/UserGameList";
import styles from "./UserGameListMobile.module.css";
import { Table, Tag } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";

const columns: ColumnsType<DataType> = [
  {
    title: "",
    dataIndex: "imageURL",
    width: 100,
    render: (imageURL: string) => (
      <img className={styles.ImageSmall} src={imageURL} alt="game" />
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
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
    title: "Platforms",
    dataIndex: "platforms",
    render: (platforms: string[]) => (
      <div className={styles.TagsContainer}>
        {platforms.map((platform: string) => {
          return (
            <Tag
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100px",
              }}
              key={platform}
            >
              {platform}
            </Tag>
          );
        })}
      </div>
    ),
  },
];

// TODO: Add type for data
const UserGameListMobile: React.FC<any> = ({ data }) => {
  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <Table
      // className={styles.Table}
      columns={columns}
      dataSource={data}
      onChange={onChange}
    />
  );
};

export default UserGameListMobile;
