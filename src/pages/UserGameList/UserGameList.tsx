import styles from "./UserGameListStyle.module.css";
import { Table } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { Game } from "@/graphql/__generated__/graphql";
import useUserGames from "@/services/userGames/useUserGames";

type DataType = Game & {
  key: React.Key;
};

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Average Score",
    dataIndex: "avgScore",
    sorter: {
      compare: (a, b) => a.avgScore - b.avgScore,
      multiple: 3,
    },
  },
  // {
  //   title: "Math Score",
  //   dataIndex: "math",
  //   sorter: {
  //     compare: (a, b) => a.math - b.math,
  //     multiple: 2,
  //   },
  // },
  // {
  //   title: "English Score",
  //   dataIndex: "english",
  //   sorter: {
  //     compare: (a, b) => a.english - b.english,
  //     multiple: 1,
  //   },
  // },
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
    <>
      <div className={styles.TableContainer}>
        <Table
          className={styles.Table}
          columns={columns}
          dataSource={data}
          onChange={onChange}
        />
      </div>
      {/* {contextHolder} */}
    </>
  );
};

export default UserGameList;
