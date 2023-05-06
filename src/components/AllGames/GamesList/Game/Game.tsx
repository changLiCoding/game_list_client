import { Col, Card, Popover, Tag, Button, Divider } from 'antd';
import {
  PlusCircleOutlined,
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import Color from 'color-thief-react';
import { Link } from 'react-router-dom';

import styles from '@/components/AllGames/GamesList/Game/Game.module.scss';
import { Game as GameType } from '@/graphql/__generated__/graphql';

export default function Game({
  game,
  colorBgContainer,
}: {
  game: GameType;
  colorBgContainer: string;
}) {
  const { Meta } = Card;

  const getRatingIcon = (avgScore: number, color: string) => {
    if (avgScore > 8.5) {
      return (
        <SmileOutlined
          style={{
            fontSize: '2.5rem',
            color: `${color}`,
            position: 'absolute',
            left: '80%',
            top: '20%',
          }}
        />
      );
    }
    if (avgScore > 6.5) {
      return (
        <MehOutlined
          style={{
            fontSize: '2.5rem',
            color: `${color}`,
            position: 'absolute',
            left: '80%',
            top: '20%',
          }}
        />
      );
    }
    return (
      <FrownOutlined
        style={{
          fontSize: '2.5rem',
          color: `${color}`,
          position: 'absolute',
          left: '80%',
          top: '20%',
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
      {({ data, error }) => (
        <Col
          className={styles.colGameCardContainer}
          xs={{ span: 12 }}
          sm={{ span: 8 }}
          md={{ span: 6 }}
          xl={{ span: 4 }}
          key={game.id}
        >
          <Popover
            color="#f0f0f0"
            title={game.name}
            content={
              <div style={{ position: 'relative' }}>
                {game.releaseDate && (
                  <p>{`Released: ${game.releaseDate.slice(0, 10)}`}</p>
                )}

                <p>{`Score: ${game.avgScore}`}</p>

                {/* Conditional rendering icon */}
                {game.avgScore && data && getRatingIcon(game.avgScore, data)}

                <Divider> Tags</Divider>
                {game.tags.map((tag: string) => (
                  <Tag key={`${game.id}${tag}`} color={data}>
                    {tag}
                  </Tag>
                ))}
              </div>
            }
          >
            {error ? (
              <p>Error!</p>
            ) : (
              <Link to={`/game-detail/${game.id}/${game.name}`}>
                {game.imageURL && (
                  <Card
                    className={styles.cardGameContainer}
                    bordered={false}
                    style={{
                      backgroundColor: colorBgContainer,
                    }}
                    cover={<img alt="example" src={game.imageURL} />}
                  >
                    <Meta
                      style={{ color: `${data}` }}
                      className={styles.metaGameDescription}
                      title={game.name}
                    />
                  </Card>
                )}
              </Link>
            )}
            <Button
              onClick={(e) => {
                e.stopPropagation();
                // console.log(game.id);
              }}
              size="large"
              type="ghost"
              className={styles.buttonGameHovershow}
              style={{
                color: `${data}`,
              }}
              icon={<PlusCircleOutlined style={{ fontSize: '1.2rem' }} />}
              shape="circle"
            />
          </Popover>
        </Col>
      )}
    </Color>
  );
}
