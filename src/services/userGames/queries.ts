import gql from "graphql-tag";

export const ADD_USER_GAME = gql`
	mutation AddUserGame($gameId: Int!) {
		addUserGame(input: { gameId: $gameId }) {
			userGame {
				id
				game {
					id
					name
					description
					imageURL
					releaseDate
					avg_score
					genres
					platforms
					tags
				}
			}
			errors
		}
	}
`;
