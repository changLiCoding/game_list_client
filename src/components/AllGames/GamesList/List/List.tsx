import { Tag } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import Color from 'color-thief-react';
import { useEffect } from 'react';

import { Game as GameType } from '@/graphql/__generated__/graphql';
import styles from '@/components/AllGames/GamesList/List/List.module.scss';
import './List.css';

function List({
  game,
  colorBgContainer,
}: {
  game: GameType;
  colorBgContainer: string;
}): JSX.Element {
  const getRatingIcon = (avgScore: number, color: string) => {
    if (avgScore > 8.5) {
      return (
        <SmileOutlined
          className={styles.listRatingIcon}
          style={{
            color: `${color}`,
          }}
        />
      );
    }
    if (avgScore > 6.5) {
      return (
        <MehOutlined
          className={styles.listRatingIcon}
          style={{
            color: `${color}`,
          }}
        />
      );
    }
    return (
      <FrownOutlined
        className={styles.listRatingIcon}
        style={{
          color: `${color}`,
        }}
      />
    );
  };
  return (
    <Color
      crossOrigin="anonymous"
      src={
        game.imageURL
          ? game.imageURL
          : 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png'
      }
      format="hex"
    >
      {({ data }) => (
        <div
          className={styles.gameListContainer}
          style={{ backgroundColor: `${colorBgContainer}` }}
        >
          <div className={styles.gameRankNumber}>
            <span className={styles.gameRankHash}>#</span>
            {game.id}
          </div>
          <a
            href={`/game-detail/${game.id}/${game.name}`}
            className={styles.gameLink}
          >
            {game.imageURL && (
              <img
                src={game?.imageURL}
                className={styles.gameImage}
                alt={game.name}
              />
            )}
          </a>
          <div className={styles.gameContent}>
            <div className={styles.gameTitle}>
              <div>
                <a href={`/game-detail/${game.id}/${game.name}`}>{game.name}</a>
              </div>
              <div className={styles.gameGenres}>
                {game.genres.map((genre: string) => (
                  <Tag
                    bordered={false}
                    color={data}
                    key={`${game.name}-${genre}`}
                  >
                    {genre}
                  </Tag>
                ))}
              </div>
            </div>
            <div className={styles.gameRating}>
              {game.avgScore && getRatingIcon(game.avgScore, '#91caff')}
              <div>
                Rating: {game.avgScore}
                <div>99999 users</div>
              </div>
            </div>
            <div className={styles.gamePlatforms} data-testid="gamePlatforms">
              {game.platforms.map((platform: string) => (
                <Tag
                  key={`${platform}-${game.name}`}
                  className={styles.gamePlatform}
                  color="geekblue"
                  style={{
                    marginBottom: '5px',
                    maxWidth: '125px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {platform}
                </Tag>
              ))}
            </div>
            <div className={styles.gameReleaseDate}>
              <div>Release Date: </div>
              {new Date(game.releaseDate).toISOString().slice(0, 10)}
            </div>
          </div>
        </div>
      )}
    </Color>
  );
}

export default List;
