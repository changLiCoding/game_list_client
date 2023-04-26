import React from "react";
import useAllGames from "../../services/games/useAllGames";
import { theme, Card, Col, Row, Popover, Tag } from "antd";
import { Content } from "antd/es/layout/layout";

export default function Games() {
	const { games } = useAllGames();
	const { Meta } = Card;
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	games && console.log(games);
	return (
		<Content>
			<Card title='All Games'>
				<Row gutter={24}>
					{games &&
						games.map((game: any) => (
							<Col span={6}>
								<Popover
									title={game.name}
									content={
										<div>
											<p>{game.description}</p>
											<p>Released: {game.releaseDate}</p>
											<p>Average Score: {game.avgScore}</p>
											<p>Total Ratings: {game.totalRating}</p>
											{game.genres.map((genre: string) => (
												<Tag color='blue'>{genre}</Tag>
											))}
										</div>
									}>
									<Card
										hoverable
										style={{
											margin: 10,
											backgroundColor: colorBgContainer,
										}}
										cover={
											<img
												alt='example'
												src='https://cdn-products.eneba.com/resized-products/BjdEY6u_350x200_2x-0.jpg'
											/>
										}>
										<Meta
											title={game.name}
											description={game.description}
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
