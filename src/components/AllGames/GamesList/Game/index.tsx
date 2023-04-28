import { Col, Card, Popover, Tag } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Color, { useColor } from "color-thief-react";

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
						className='Col-Games-CardContainer'
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
							{loading ? (
								<p>Loading...</p>
							) : error ? (
								<p>Error!</p>
							) : (
								<Card
									className='Card-Games-container'
									// hoverable
									bordered={false}
									style={{
										backgroundColor: colorBgContainer,
									}}
									cover={
										<img
											className='img-Games-background'
											alt='example'
											src={game.imageURL}
										/>
									}>
									<PlusCircleOutlined
										style={{ color: `${data}` }}
										className='PlusCircleOutlined-Games-hovershow'
									/>
									<Meta
										style={{ color: `${data}` }}
										className='Meta-Games-description'
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
