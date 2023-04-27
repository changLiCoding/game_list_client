import styles from "./UserGameListStyle.module.css";
import { Layout, List, Popover, Space, Table, Tag } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { Game } from "@/graphql/__generated__/graphql";
import useUserGames from "@/services/userGames/useUserGames";

type DataType = Game & {
  key: React.Key;
};

const columns: ColumnsType<DataType> = [
  {
    title: "",
    dataIndex: "imageURL",
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
            ></img>
          }
        >
          <img className={styles.Image} src={imageURL} alt="game" />
        </Popover>
        <img className={styles.ImageSmall} src={imageURL} alt="game" />
      </>
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 3,
    },
  },
  {
    title: "Average Score",
    dataIndex: "avgScore",
    sorter: {
      compare: (a, b) => a.avgScore - b.avgScore,
      multiple: 3,
    },
  },
  {
    title: "Platforms",
    dataIndex: "platforms",
    render: (platforms: string[]) => (
      <div className={styles.TagsContainer}>
        {platforms.map((platform: string) => {
          return <Tag key={platform}>{platform}</Tag>;
        })}
      </div>
    ),
  },
];

const UserGameList = () => {
  // info("Cannot load the list of games");
  const { gamesForAUserLoading, gamesForAUser } = useUserGames();

  if (gamesForAUserLoading) {
    return <div>Loading...</div>;
  }

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const data = gamesForAUser?.gamesForAUser.map((val: Game) => {
    return {
      key: val.id,
      ...val,
    };
  });

  console.log(gamesForAUser?.gamesForAUser);

  return (
    <Layout>
      <div className={styles.TableContainer}>
        {/* <div className={`${styles.TableContainer} ${styles.TableAdditional}`}> */}
        <Table
          className={styles.Table}
          columns={columns}
          dataSource={data}
          onChange={onChange}
        />
      </div>
      <div className={styles.TableContainerSmall}>
        {/* <List
          className={styles.List}
          dataSource={data}
          renderItem={(item: any, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <div className={styles.ImageHolderSmall}>
                    <img
                      className={styles.Image}
                      src={item.imageURL}
                      alt="game"
                    />
                  </div>
                }
                title={<p>{item.name}</p>}
                description={item.avgScore}
              />
              <Space className={styles.TagsContainerSmall} wrap>
                {item.platforms.map((platform: any) => (
                  <Tag
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "100px",
                    }}
                  >
                    {platform}
                  </Tag>
                ))}
              </Space>
            </List.Item>
          )}
        /> */}
      </div>
      {/* {contextHolder} */}
    </Layout>
  );
};

export default UserGameList;
