import { useMemo, useState } from 'react';
import { Button, Layout, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { HeartOutlined, DownCircleOutlined } from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';
import ListEditor from '@/components/ListEditor';
import styles from '@/components/GameDetailHeader/GameDetailHeaderInfo/GameDetailHeaderInfo.module.scss';
import type { GameDetailsType } from '@/components/GameDetailHeader/types';
import useUserGameById from '@/services/userGames/useUserGameById';
import { useAppSelector } from '@/app/hooks';
import type { Game as GameType } from '@/graphql/__generated__/graphql';
import useAddRemoveGameCustomHook from '@/hooks/useAddRemoveGameCustomHook';
import useAddRemoveLike from '@/services/like/useAddRemoveLike';
import type { GameDataType } from '@/components/GamesListTable/types';

function GameDetailHeaderInfoTemp({ game, setGame }: GameDetailsType) {
  const [open, setOpen] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  const { userGameLoading, fetchUserGame } = useUserGameById();
  const { addLike, removeLike } = useAddRemoveLike();

  const { addedList } = useAppSelector((state) => state.addedGames);

  const {
    handleAddGameHook,
    contextHolder: handGameContextHolder,
    handleEditUserGameStatus,
    info,
  } = useAddRemoveGameCustomHook();

  const items: MenuProps['items'] = useMemo(() => {
    return ['Planning', 'Playing', 'Open List Editor'].map((item) => {
      if (item === 'Open List Editor') {
        return {
          key: item,
          label: (
            <>
              <Button
                type="text"
                onClick={(e) => {
                  e.preventDefault();
                  fetchUserGame({ variables: { gameId: game.id } });
                  setOpen(!open);
                }}
              >
                Open List Editor
              </Button>
              <ListEditor
                isGameAdded={addedList.includes(game.id as string)}
                userGameLoading={userGameLoading}
                open={open}
                setOpen={setOpen}
                game={game as GameDataType}
                setSelectedGame={setGame}
              />
            </>
          ),
        };
      }
      return {
        key: item,
        label: (
          <Button
            type="text"
            onClick={async () => {
              await handleEditUserGameStatus(item, game as GameType);
            }}
          >
            {' '}
            Set as {item}
          </Button>
        ),
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, userGameLoading, game.isGameLiked, addedList]);
  return (
    <Layout className={styles.infoContainer}>
      <Content className={styles.infoContent}>
        <div className={styles.infoOverlap}>
          <div className={styles.overlapInner}>
            {game?.imageURL && (
              <img
                alt={game?.name}
                src={game?.imageURL}
                className={styles.infoImage}
              />
            )}
            <div className={styles.infoActions}>
              <Space.Compact className={styles.listActions}>
                <Button
                  type="primary"
                  className={styles.add}
                  onClick={async () => {
                    await handleAddGameHook(game as GameType);
                  }}
                >
                  Add to List
                </Button>

                <Dropdown
                  arrow
                  className="dropdown"
                  menu={{ items }}
                  placement="bottomRight"
                  trigger={['click']}
                >
                  <Button type="primary" icon={<DownCircleOutlined />} />
                </Dropdown>
              </Space.Compact>
              <div>
                <Button
                  type="primary"
                  danger={game.isGameLiked}
                  icon={<HeartOutlined />}
                  onClick={async () => {
                    if (user.id === '') {
                      info(`Please login to add this game to your liked list`);
                      return;
                    }
                    if (!game.isGameLiked) {
                      const response = await addLike(game.id as string, 'Game');
                      setGame({ ...(response.like?.likeable as GameType) });

                      info(`Game ${game.name} added to your liked list`);
                    } else {
                      const response = await removeLike(
                        game.id as string,
                        'Game'
                      );

                      setGame({ ...(response.like?.likeable as GameType) });

                      info(`Game ${game.name} removed from your liked list`);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.infoInfo}>
          <h1>{game.name}</h1>
          <p>{game.description}</p>
          <div className={styles.infoInfoTags}>
            <a href="/">Overview</a>
            <a href="/">Reviews</a>
            <a href="/">Related</a>
            <a href="/">Status</a>
            <a href="/">Social</a>
          </div>
        </div>
      </Content>
      {handGameContextHolder}
    </Layout>
  );
}

// const GameDetailHeaderInfo = React.memo(GameDetailHeaderInfoTemp);

export default GameDetailHeaderInfoTemp;
