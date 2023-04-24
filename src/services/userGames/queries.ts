import gql from "graphql-tag";

export const ADD_USER_GAMES = gql`
	mutation AddUserGames($gameId: ID!) {
		addUserGames(input: { gameId: $gameId }) {
			userGame {
				id
				game {
					id
					name
					description
					imageURL
					releaseDate
					avgScore
					genres
					platforms
					tags
				}
			}
			errors
		}
	}
`;
