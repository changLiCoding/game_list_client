import gql from 'graphql-tag';

export const DELETE_USER_GAMES = gql`
	mutation DeleteUserGames($gameId: ID!) {
		deleteUserGames(input: { gameId: $gameId }) {
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

export const GAMES_FOR_A_USER = gql`
	query GamesForAUser {
		gamesForAUser {
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
`;
