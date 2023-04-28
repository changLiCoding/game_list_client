import { theme, Card, Col, Row, Popover, Tag } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";

// import type { Game } from "@/graphql/__generated__/graphql";
import Game from "./Game";
import useAllGames from "@/services/games/useAllGames";

import "./GamesList.css";

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
				<Row gutter={{ xs: 8, sm: 16, md: 24, xl: 32 }}>
					{games &&
						games.map((game: any) => (
							<Game
								key={game.id}
								game={game}
								colorBgContainer={colorBgContainer}
							/>
						))}
				</Row>
			</Card>
		</Content>
	);
}
