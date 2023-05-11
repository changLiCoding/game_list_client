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
    "\n  query GetGenresPlatformsTags {\n    getGenresPlatformsTags {\n      genres\n      platforms\n      tags\n      errors\n    }\n  }\n": types.GetGenresPlatformsTagsDocument,
    "\n  query GetAllGames {\n    allGames {\n      id\n      name\n      description\n      bannerURL\n      imageURL\n      releaseDate\n      avgScore\n      totalRating\n      genres\n      tags\n      platforms\n    }\n  }\n": types.GetAllGamesDocument,
    "\n  query User {\n    getUserById {\n      username\n      bannerPicture\n      userPicture\n    }\n  }\n": types.UserDocument,
    "\n  mutation DeleteUserGames($gameId: ID!) {\n    deleteUserGames(input: { gameId: $gameId }) {\n      userGame {\n        id\n        game {\n          id\n          name\n          description\n          imageURL\n          bannerURL\n          releaseDate\n          avgScore\n          genres\n          platforms\n          tags\n        }\n      }\n      errors\n    }\n  }\n": types.DeleteUserGamesDocument,
    "\n  mutation AddUserGames($gameId: ID!) {\n    addUserGames(input: { gameId: $gameId }) {\n      userGame {\n        id\n        game {\n          id\n          name\n          description\n          imageURL\n          bannerURL\n          releaseDate\n          avgScore\n          genres\n          platforms\n          tags\n        }\n      }\n      errors\n    }\n  }\n": types.AddUserGamesDocument,
    "\n  query GamesForAUser {\n    gamesForAUser {\n      id\n      name\n      description\n      imageURL\n      bannerURL\n      releaseDate\n      avgScore\n      genres\n      platforms\n      tags\n    }\n  }\n": types.GamesForAUserDocument,
    "\n  query GamesByTagsForAUser {\n    gamesByStatusForAUser {\n      playing {\n        id\n        name\n        imageURL\n        avgScore\n        platforms\n      }\n      planning {\n        id\n        name\n        imageURL\n        avgScore\n        platforms\n      }\n      completed {\n        id\n        name\n        imageURL\n        avgScore\n        platforms\n      }\n      paused {\n        id\n        name\n        imageURL\n        avgScore\n        platforms\n      }\n      dropped {\n        id\n        name\n        imageURL\n        avgScore\n        platforms\n      }\n      playingCount\n      planningCount\n      completedCount\n      pausedCount\n      droppedCount\n      totalCount\n      errors\n    }\n  }\n": types.GamesByTagsForAUserDocument,
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
export function gql(source: "\n  query GetGenresPlatformsTags {\n    getGenresPlatformsTags {\n      genres\n      platforms\n      tags\n      errors\n    }\n  }\n"): (typeof documents)["\n  query GetGenresPlatformsTags {\n    getGenresPlatformsTags {\n      genres\n      platforms\n      tags\n      errors\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllGames {\n    allGames {\n      id\n      name\n      description\n      bannerURL\n      imageURL\n      releaseDate\n      avgScore\n      totalRating\n      genres\n      tags\n      platforms\n    }\n  }\n"): (typeof documents)["\n  query GetAllGames {\n    allGames {\n      id\n      name\n      description\n      bannerURL\n      imageURL\n      releaseDate\n      avgScore\n      totalRating\n      genres\n      tags\n      platforms\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query User {\n    getUserById {\n      username\n      bannerPicture\n      userPicture\n    }\n  }\n"): (typeof documents)["\n  query User {\n    getUserById {\n      username\n      bannerPicture\n      userPicture\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteUserGames($gameId: ID!) {\n    deleteUserGames(input: { gameId: $gameId }) {\n      userGame {\n        id\n        game {\n          id\n          name\n          description\n          imageURL\n          bannerURL\n          releaseDate\n          avgScore\n          genres\n          platforms\n          tags\n        }\n      }\n      errors\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUserGames($gameId: ID!) {\n    deleteUserGames(input: { gameId: $gameId }) {\n      userGame {\n        id\n        game {\n          id\n          name\n          description\n          imageURL\n          bannerURL\n          releaseDate\n          avgScore\n          genres\n          platforms\n          tags\n        }\n      }\n      errors\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddUserGames($gameId: ID!) {\n    addUserGames(input: { gameId: $gameId }) {\n      userGame {\n        id\n        game {\n          id\n          name\n          description\n          imageURL\n          bannerURL\n          releaseDate\n          avgScore\n          genres\n          platforms\n          tags\n        }\n      }\n      errors\n    }\n  }\n"): (typeof documents)["\n  mutation AddUserGames($gameId: ID!) {\n    addUserGames(input: { gameId: $gameId }) {\n      userGame {\n        id\n        game {\n          id\n          name\n          description\n          imageURL\n          bannerURL\n          releaseDate\n          avgScore\n          genres\n          platforms\n          tags\n        }\n      }\n      errors\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GamesForAUser {\n    gamesForAUser {\n      id\n      name\n      description\n      imageURL\n      bannerURL\n      releaseDate\n      avgScore\n      genres\n      platforms\n      tags\n    }\n  }\n"): (typeof documents)["\n  query GamesForAUser {\n    gamesForAUser {\n      id\n      name\n      description\n      imageURL\n      bannerURL\n      releaseDate\n      avgScore\n      genres\n      platforms\n      tags\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GamesByTagsForAUser {\n    gamesByStatusForAUser {\n      playing {\n        id\n        name\n        imageURL\n        avgScore\n        platforms\n      }\n      planning {\n        id\n        name\n        imageURL\n        avgScore\n        platforms\n      }\n      completed {\n        id\n        name\n        imageURL\n        avgScore\n        platforms\n      }\n      paused {\n        id\n        name\n        imageURL\n        avgScore\n        platforms\n      }\n      dropped {\n        id\n        name\n        imageURL\n        avgScore\n        platforms\n      }\n      playingCount\n      planningCount\n      completedCount\n      pausedCount\n      droppedCount\n      totalCount\n      errors\n    }\n  }\n"): (typeof documents)["\n  query GamesByTagsForAUser {\n    gamesByStatusForAUser {\n      playing {\n        id\n        name\n        imageURL\n        avgScore\n        platforms\n      }\n      planning {\n        id\n        name\n        imageURL\n        avgScore\n        platforms\n      }\n      completed {\n        id\n        name\n        imageURL\n        avgScore\n        platforms\n      }\n      paused {\n        id\n        name\n        imageURL\n        avgScore\n        platforms\n      }\n      dropped {\n        id\n        name\n        imageURL\n        avgScore\n        platforms\n      }\n      playingCount\n      planningCount\n      completedCount\n      pausedCount\n      droppedCount\n      totalCount\n      errors\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;