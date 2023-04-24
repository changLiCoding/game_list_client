/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: any;
  Scalar: any;
};

/** Autogenerated input type of AddUserGames */
export type AddUserGamesInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  gameId: Scalars['ID'];
};

/** Autogenerated return type of AddUserGames. */
export type AddUserGamesPayload = {
  __typename?: 'AddUserGamesPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Scalars['String']>>;
  userGame?: Maybe<UserGame>;
};

/** Autogenerated input type of DeleteUserGames */
export type DeleteUserGamesInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  gameId: Scalars['ID'];
};

/** Autogenerated return type of DeleteUserGames. */
export type DeleteUserGamesPayload = {
  __typename?: 'DeleteUserGamesPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Scalars['String']>>;
  userGame?: Maybe<UserGame>;
};

export type Game = {
  __typename?: 'Game';
  avgScore: Scalars['Float'];
  description: Scalars['String'];
  genres: Array<Scalars['String']>;
  id: Scalars['ID'];
  imageURL: Scalars['String'];
  name: Scalars['String'];
  platforms: Array<Scalars['String']>;
  releaseDate: Scalars['ISO8601DateTime'];
  tags: Array<Scalars['String']>;
  totalRating: Scalars['Int'];
};

export type Genre = {
  __typename?: 'Genre';
  games: Array<Game>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** Attributes for querying games by the genre type */
export type GenreAttributes = {
  /** ID of the Genre */
  ID?: InputMaybe<Scalars['Int']>;
  /** Name of the Genre */
  name?: InputMaybe<Scalars['String']>;
};

/** Autogenerated input type of LoginUser */
export type LoginUserInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
};

/** Autogenerated return type of LoginUser. */
export type LoginUserPayload = {
  __typename?: 'LoginUserPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Add a game to user's list according to user_id and game_id */
  addUserGames?: Maybe<AddUserGamesPayload>;
  deleteUserGames?: Maybe<DeleteUserGamesPayload>;
  login?: Maybe<LoginUserPayload>;
  register?: Maybe<RegisterUserPayload>;
  updateUser?: Maybe<UpdateUserPayload>;
};


export type MutationAddUserGamesArgs = {
  input: AddUserGamesInput;
};


export type MutationDeleteUserGamesArgs = {
  input: DeleteUserGamesInput;
};


export type MutationLoginArgs = {
  input: LoginUserInput;
};


export type MutationRegisterArgs = {
  input: RegisterUserInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Platform = {
  __typename?: 'Platform';
  games: Array<Game>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** Attributes for querying games by the platform type */
export type PlatformAttributes = {
  /** ID of the Platform */
  ID?: InputMaybe<Scalars['Int']>;
  /** Name of the Platform */
  name?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** Get all games */
  allGames: Array<Game>;
  /** Get a list of games for a user */
  gamesForAUser: Array<Game>;
  /** Get all games by genre */
  getAllGamesByGenre: Array<Game>;
  /** Get all games by platform */
  getAllGamesByPlatform: Array<Game>;
  /** Get all games by tag */
  getAllGamesByTag: Array<Game>;
  /** Get all genres */
  getAllGenres: Array<Genre>;
  /** Get all platforms */
  getAllPlatforms: Array<Platform>;
  /** Get all tags */
  getAllTags: Array<Tag>;
  /** Get all users */
  getAllUsers: Array<User>;
  /** Get user by id */
  getUserById: User;
};


export type QueryGetAllGamesByGenreArgs = {
  genre?: InputMaybe<GenreAttributes>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryGetAllGamesByPlatformArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  platform?: InputMaybe<PlatformAttributes>;
};


export type QueryGetAllGamesByTagArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  tag?: InputMaybe<TagAttributes>;
};

/** Autogenerated input type of RegisterUser */
export type RegisterUserInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

/** Autogenerated return type of RegisterUser. */
export type RegisterUserPayload = {
  __typename?: 'RegisterUserPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Tag = {
  __typename?: 'Tag';
  games: Array<Game>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** Attributes for querying games by the tag type */
export type TagAttributes = {
  /** ID of the Tag */
  ID?: InputMaybe<Scalars['Int']>;
  /** Name of the Tag */
  name?: InputMaybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateUser */
export type UpdateUserInput = {
  action: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  payload: Scalars['Scalar'];
};

/** Autogenerated return type of UpdateUser. */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Scalars['String']>>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  bannerPicture?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  email?: Maybe<Scalars['String']>;
  games: Array<Game>;
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  userGames: Array<UserGame>;
  userPicture?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UserGame = {
  __typename?: 'UserGame';
  completedDate: Scalars['ISO8601DateTime'];
  createdAt: Scalars['ISO8601DateTime'];
  game: Game;
  gameNote: Scalars['String'];
  gameStatus: Scalars['String'];
  id: Scalars['ID'];
  private: Scalars['Boolean'];
  rating: Scalars['Float'];
  review: Scalars['String'];
  startDate: Scalars['ISO8601DateTime'];
  updatedAt: Scalars['ISO8601DateTime'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginUserPayload', token?: string | null, errors: Array<string>, user?: { __typename?: 'User', username?: string | null } | null } | null };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'RegisterUserPayload', token?: string | null, errors: Array<string>, user?: { __typename?: 'User', username?: string | null } | null } | null };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', getUserById: { __typename?: 'User', username?: string | null, email?: string | null, bannerPicture?: string | null, userPicture?: string | null } };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserById"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"bannerPicture"}},{"kind":"Field","name":{"kind":"Name","value":"userPicture"}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;