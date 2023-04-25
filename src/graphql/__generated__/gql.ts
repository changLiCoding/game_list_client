/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation Login($email: String!, $password: String!) {\n    login(input: { email: $email, password: $password }) {\n      user {\n        username\n      }\n      token\n      errors\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Register($username: String!, $email: String!, $password: String!) {\n    register(\n      input: { username: $username, email: $email, password: $password }\n    ) {\n      user {\n        username\n      }\n      token\n      errors\n    }\n  }\n": types.RegisterDocument,
    "\n  query GetAllGamesByGenre($genre: EntityIdNameAttributes!, $limit: Int) {\n    getAllGamesByGenre(genre: $genre, limit: $limit) {\n      name\n    }\n  }\n": types.GetAllGamesByGenreDocument,
    "\n  query GetAllGamesByPlatform($platform: EntityIdNameAttributes!, $limit: Int) {\n    getAllGamesByPlatform(platform: $platform, limit: $limit) {\n      name\n    }\n  }\n": types.GetAllGamesByPlatformDocument,
    "\n  query GetAllGamesByTag($tag: EntityIdNameAttributes!, $limit: Int) {\n    getAllGamesByTag(tag: $tag, limit: $limit) {\n      name\n    }\n  }\n": types.GetAllGamesByTagDocument,
    "\n  query GetAllGames {\n    allGames {\n      id\n      name\n      description\n      imageURL\n      releaseDate\n      avgScore\n      totalRating\n      genres\n      tags\n      platforms\n    }\n  }\n": types.GetAllGamesDocument,
    "\n  query User {\n    getUserById {\n      username\n      bannerPicture\n      userPicture\n    }\n  }\n": types.UserDocument,
    "\n\tmutation DeleteUserGames($gameId: ID!) {\n\t\tdeleteUserGames(input: { gameId: $gameId }) {\n\t\t\tuserGame {\n\t\t\t\tid\n\t\t\t\tgame {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tdescription\n\t\t\t\t\timageURL\n\t\t\t\t\treleaseDate\n\t\t\t\t\tavgScore\n\t\t\t\t\tgenres\n\t\t\t\t\tplatforms\n\t\t\t\t\ttags\n\t\t\t\t}\n\t\t\t}\n\t\t\terrors\n\t\t}\n\t}\n": types.DeleteUserGamesDocument,
    "\n\tmutation AddUserGames($gameId: ID!) {\n\t\taddUserGames(input: { gameId: $gameId }) {\n\t\t\tuserGame {\n\t\t\t\tid\n\t\t\t\tgame {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tdescription\n\t\t\t\t\timageURL\n\t\t\t\t\treleaseDate\n\t\t\t\t\tavgScore\n\t\t\t\t\tgenres\n\t\t\t\t\tplatforms\n\t\t\t\t\ttags\n\t\t\t\t}\n\t\t\t}\n\t\t\terrors\n\t\t}\n\t}\n": types.AddUserGamesDocument,
    "\n\tquery GamesForAUser {\n\t\tgamesForAUser {\n\t\t\tid\n\t\t\tname\n\t\t\tdescription\n\t\t\timageURL\n\t\t\treleaseDate\n\t\t\tavgScore\n\t\t\tgenres\n\t\t\tplatforms\n\t\t\ttags\n\t\t}\n\t}\n": types.GamesForAUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(input: { email: $email, password: $password }) {\n      user {\n        username\n      }\n      token\n      errors\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    login(input: { email: $email, password: $password }) {\n      user {\n        username\n      }\n      token\n      errors\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Register($username: String!, $email: String!, $password: String!) {\n    register(\n      input: { username: $username, email: $email, password: $password }\n    ) {\n      user {\n        username\n      }\n      token\n      errors\n    }\n  }\n"): (typeof documents)["\n  mutation Register($username: String!, $email: String!, $password: String!) {\n    register(\n      input: { username: $username, email: $email, password: $password }\n    ) {\n      user {\n        username\n      }\n      token\n      errors\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllGamesByGenre($genre: EntityIdNameAttributes!, $limit: Int) {\n    getAllGamesByGenre(genre: $genre, limit: $limit) {\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetAllGamesByGenre($genre: EntityIdNameAttributes!, $limit: Int) {\n    getAllGamesByGenre(genre: $genre, limit: $limit) {\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllGamesByPlatform($platform: EntityIdNameAttributes!, $limit: Int) {\n    getAllGamesByPlatform(platform: $platform, limit: $limit) {\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetAllGamesByPlatform($platform: EntityIdNameAttributes!, $limit: Int) {\n    getAllGamesByPlatform(platform: $platform, limit: $limit) {\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllGamesByTag($tag: EntityIdNameAttributes!, $limit: Int) {\n    getAllGamesByTag(tag: $tag, limit: $limit) {\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetAllGamesByTag($tag: EntityIdNameAttributes!, $limit: Int) {\n    getAllGamesByTag(tag: $tag, limit: $limit) {\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllGames {\n    allGames {\n      id\n      name\n      description\n      imageURL\n      releaseDate\n      avgScore\n      totalRating\n      genres\n      tags\n      platforms\n    }\n  }\n"): (typeof documents)["\n  query GetAllGames {\n    allGames {\n      id\n      name\n      description\n      imageURL\n      releaseDate\n      avgScore\n      totalRating\n      genres\n      tags\n      platforms\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query User {\n    getUserById {\n      username\n      bannerPicture\n      userPicture\n    }\n  }\n"): (typeof documents)["\n  query User {\n    getUserById {\n      username\n      bannerPicture\n      userPicture\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation DeleteUserGames($gameId: ID!) {\n\t\tdeleteUserGames(input: { gameId: $gameId }) {\n\t\t\tuserGame {\n\t\t\t\tid\n\t\t\t\tgame {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tdescription\n\t\t\t\t\timageURL\n\t\t\t\t\treleaseDate\n\t\t\t\t\tavgScore\n\t\t\t\t\tgenres\n\t\t\t\t\tplatforms\n\t\t\t\t\ttags\n\t\t\t\t}\n\t\t\t}\n\t\t\terrors\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation DeleteUserGames($gameId: ID!) {\n\t\tdeleteUserGames(input: { gameId: $gameId }) {\n\t\t\tuserGame {\n\t\t\t\tid\n\t\t\t\tgame {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tdescription\n\t\t\t\t\timageURL\n\t\t\t\t\treleaseDate\n\t\t\t\t\tavgScore\n\t\t\t\t\tgenres\n\t\t\t\t\tplatforms\n\t\t\t\t\ttags\n\t\t\t\t}\n\t\t\t}\n\t\t\terrors\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation AddUserGames($gameId: ID!) {\n\t\taddUserGames(input: { gameId: $gameId }) {\n\t\t\tuserGame {\n\t\t\t\tid\n\t\t\t\tgame {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tdescription\n\t\t\t\t\timageURL\n\t\t\t\t\treleaseDate\n\t\t\t\t\tavgScore\n\t\t\t\t\tgenres\n\t\t\t\t\tplatforms\n\t\t\t\t\ttags\n\t\t\t\t}\n\t\t\t}\n\t\t\terrors\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation AddUserGames($gameId: ID!) {\n\t\taddUserGames(input: { gameId: $gameId }) {\n\t\t\tuserGame {\n\t\t\t\tid\n\t\t\t\tgame {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tdescription\n\t\t\t\t\timageURL\n\t\t\t\t\treleaseDate\n\t\t\t\t\tavgScore\n\t\t\t\t\tgenres\n\t\t\t\t\tplatforms\n\t\t\t\t\ttags\n\t\t\t\t}\n\t\t\t}\n\t\t\terrors\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GamesForAUser {\n\t\tgamesForAUser {\n\t\t\tid\n\t\t\tname\n\t\t\tdescription\n\t\t\timageURL\n\t\t\treleaseDate\n\t\t\tavgScore\n\t\t\tgenres\n\t\t\tplatforms\n\t\t\ttags\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GamesForAUser {\n\t\tgamesForAUser {\n\t\t\tid\n\t\t\tname\n\t\t\tdescription\n\t\t\timageURL\n\t\t\treleaseDate\n\t\t\tavgScore\n\t\t\tgenres\n\t\t\tplatforms\n\t\t\ttags\n\t\t}\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;