import React from 'react';
import {
  theme, Card, Col, Row, Popover, Tag,
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import useAllGames from '../../services/games/useAllGames';
import './Games.css';

export default function Games() {
  const { games } = useAllGames();
  const { Meta } = Card;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  games && console.log(games);
  return (
    <Content>
      <Card title="All Games">
        <Row gutter={24}>
          {games
						&& games.map((game: any) => (
  <Col
    span={6}
    key={game.id}
  >
    <Popover
      title={game.name}
      content={(
        <div>
          <p>{game.description}</p>
          <p>
            Released:
            {game.releaseDate}
          </p>
          <p>
            Average Score:
            {game.avgScore}
          </p>
          <p>
            Total Ratings:
            {game.totalRating}
          </p>
          {game.genres.map((genre: string) => (
            <Tag
              key={`${game.id}${genre}`}
              color="blue"
            >
              {genre}
            </Tag>
          ))}
        </div>
        )}
    >
      <Card
        className="Card-Games-container"
        hoverable
        bordered={false}
        style={{
										  margin: 5,
										  backgroundColor: colorBgContainer,
        }}
        cover={(
          <img
            className="img-Games-background"
            alt="example"
            src="https://cdn.cdkeys.com/700x700/media/catalog/product/5/d/5de6658946177c5f23698932_24__1_3.jpg"
          />
         )}
      >
        <Meta
          style={{ color: 'white' }}
          className="Meta-Games-description"
          title={game.name}
        />
      </Card>
    </Popover>
  </Col>
						))}
        </Row>
      </Card>
    </Content>
  );
}
