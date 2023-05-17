import { useState } from 'react';
import { Col, Card, Popover, Tag, Button, Divider } from 'antd';
import {
  PlusCircleOutlined,
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import Color from 'color-thief-react';
import { Link } from 'react-router-dom';
import styles from '@/components/AllGames/GamesList/GameCard/GameCard.module.scss';
import ListEditor from '@/components/ListEditor';
import type { GameCardType } from '@/components/AllGames/GamesList/types';
import useUserGameById from '@/services/userGames/useUserGameById';

export function getRatingIcon(avgScore: number, color: string) {
  if (avgScore > 8.5) {
    return (
      <SmileOutlined
        className={styles.ratingIcon}
        style={{
          color: `${color}`,
        }}
      />
    );
  }
  if (avgScore > 6.5) {
    return (
      <MehOutlined
        className={styles.ratingIcon}
        style={{
          color: `${color}`,
        }}
      />
    );
  }
  return (
    <FrownOutlined
      className={styles.ratingIcon}
      style={{
        color: `${color}`,
      }}
    />
  );
}

export default function GameCard({ game, colorBgContainer }: GameCardType) {
  const { Meta } = Card;

  const [open, setOpen] = useState(false);

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
                {game.avgScore &&
                  getRatingIcon(game.avgScore, data as string | '#6927d3')}

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
                setOpen(!open);
              }}
              size="middle"
              type="ghost"
              className={styles.buttonGameHovershow}
              style={{
                color: `${data}`,
              }}
              icon={<PlusCircleOutlined style={{ fontSize: '1rem' }} />}
              shape="circle"
            />
            <ListEditor open={open} setOpen={setOpen} game={game} />
          </Popover>
        </Col>
      )}
    </Color>
  );
}
