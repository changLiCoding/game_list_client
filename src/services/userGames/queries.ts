import gql from "graphql-tag";

export const DELETE_USERGAMES = gql`
	mutation DeleteUserGames($gameId: ID!) {
		deleteUserGames(input: { gameId: $gameId }) {
			userGames {
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
