// import styles from './UserGameListStyle.module.scss';
import type { Game } from '@/graphql/__generated__/graphql';
import useGamesByStatus from '@/services/userGames/useGamesByStatus';
import UserGamesTable from '@/components/UserGameList/UserGamesTable';

function UserGameList() {
  const { gamesByTagForAUserLoading, gamesByTagForAUser } = useGamesByStatus();

  if (gamesByTagForAUserLoading) {
    return <div>Loading...</div>;
  }

  // console.log('gamesByTagForAUser', gamesByTagForAUser);

  const playingGames = gamesByTagForAUser?.gamesByStatusForAUser?.playing.map(
    (val: Game) => ({
      key: val.id,
      ...val,
    })
  );

  const planningGames = gamesByTagForAUser?.gamesByStatusForAUser?.planning.map(
    (val: Game) => ({
      key: val.id,
      ...val,
    })
  );

  const completedGames =
    gamesByTagForAUser?.gamesByStatusForAUser?.completed.map((val: Game) => ({
      key: val.id,
      ...val,
    }));

  const pausedGames = gamesByTagForAUser?.gamesByStatusForAUser?.paused.map(
    (val: Game) => ({
      key: val.id,
      ...val,
    })
  );

  const droppedGames = gamesByTagForAUser?.gamesByStatusForAUser?.dropped.map(
    (val: Game) => ({
      key: val.id,
      ...val,
    })
  );

  return (
    <>
      <UserGamesTable gamesData={playingGames} title="Playing" />
      <UserGamesTable gamesData={planningGames} title="Planning" />
      <UserGamesTable gamesData={completedGames} title="Completed" />
      <UserGamesTable gamesData={pausedGames} title="Paused" />
      <UserGamesTable gamesData={droppedGames} title="Dropped" />
    </>
  );
}

export default UserGameList;

// import styles from "./UserGameListStyle.module.css";
// import { Layout } from "antd";
// import { Game } from "@/graphql/__generated__/graphql";
// import useUserGames from "@/services/userGames/useUserGames";
// import UserGameListDesktop from "@/components/UserGameList/Desktop";
// import UserGameListMobile from "@/components/UserGameList/Mobile";

// const UserGameList = () => {
//   // info("Cannot load the list of games");
//   const { gamesForAUserLoading, gamesForAUser } = useUserGames();

//   if (gamesForAUserLoading) {
//     return <div>Loading...</div>;
//   }

//   const data = gamesForAUser?.gamesForAUser.map((val: Game) => {
//     return {
//       key: val.id,
//       ...val,
//     };
//   });

//   console.log(gamesForAUser?.gamesForAUser);

//   return (
//     <Layout>
//       <div className={styles.TableContainer}>
//         <UserGameListDesktop data={data} />
//       </div>
//       <div className={styles.TableContainerSmall}>
//         <UserGameListMobile data={data} />
//         {/* <List
//           className={styles.List}
//           dataSource={data}
//           renderItem={(item: any, index) => (
//             <List.Item>
//               <List.Item.Meta
//                 avatar={
//                   <div className={styles.ImageHolderSmall}>
//                     <img
//                       className={styles.Image}
//                       src={item.imageURL}
//                       alt="game"
//                     />
//                   </div>
//                 }
//                 title={<p>{item.name}</p>}
//                 description={item.avgScore}
//               />
//               <Space className={styles.TagsContainerSmall} wrap>
//                 {item.platforms.map((platform: any) => (
//                   <Tag
//                     style={{
//                       whiteSpace: "nowrap",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                       maxWidth: "100px",
//                     }}
//                   >
//                     {platform}
//                   </Tag>
//                 ))}
//               </Space>
//             </List.Item>
//           )}
//         /> */}
//       </div>
//       {/* {contextHolder} */}
//     </Layout>
//   );
// };

// export default UserGameList;
