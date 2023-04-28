import { Col, Card, Popover, Tag, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Color from "color-thief-react";

import "./Game.css";
import { Game as GameType } from "@/graphql/__generated__/graphql";

export default function Game({
	game,
	colorBgContainer,
}: {
	game: GameType;
	colorBgContainer: string;
}) {
	const { Meta } = Card;

	return (
		<Color
			crossOrigin='anonymous'
			src={game.imageURL}
			format='hex'>
			{({ data, loading, error }) => {
				return (
					<Col
						className='Col-Game-CardContainer'
						xs={{ span: 12 }}
						sm={{ span: 8 }}
						md={{ span: 6 }}
						xl={{ span: 4 }}
						key={game.id}>
						<Popover
							title={game.name}
							content={
								<div>
									<p>{game.description}</p>
									<p>Released: {game.releaseDate}</p>
									<p>Average Score: {game.avgScore}</p>
									<p>Total Ratings: {game.totalRating}</p>
									{game.genres.map((genre: string) => (
										<Tag
											key={`${game.id}${genre}`}
											color={data}>
											{genre}
										</Tag>
									))}
								</div>
							}>
							{error ? (
								<p>Error!</p>
							) : (
								<Card
									loading={loading}
									className='Card-Game-container'
									// hoverable
									bordered={false}
									style={{
										backgroundColor: colorBgContainer,
									}}
									cover={
										<img
											alt='example'
											src={game.imageURL}
										/>
									}>
									<Button
										onClick={() => {
											console.log(game.id);
										}}
										size='large'
										className='Button-Game-hovershow'
										type='ghost'
										style={{ color: `${data}` }}
										icon={<PlusCircleOutlined style={{ fontSize: "1.2rem" }} />}
										shape='circle'></Button>
									<Meta
										style={{ color: `${data}` }}
										className='Meta-Game-description'
										title={game.name}
									/>
								</Card>
							)}
						</Popover>
					</Col>
				);
			}}
		</Color>
	);
}
