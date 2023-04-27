import { Layout } from "antd";
import Games from "./Games";
import "./AllGames.css";

import { Content } from "antd/es/layout/layout";

export default function AllGames() {
	return (
		<div className='Lagout-AllGames-container'>
			<Games />
		</div>
	);
}
