export type InitialStateType = {
  loading: boolean;
  user: UserInfo;
};

type UserInfo = {
  username: string;
  bannerPicture: string;
  createdAt: string;
  games: string[];
  isActive: boolean;
  userGames: string[];
  userPicture: string;
  __typename: string;
};

export type InitialStateUserGamesListType = {
  selectedList: string;
  selectedLists: string[];
  listOrder: string[];
  localListOrder: string[];
  filters: {
    platform: string;
    tag: string;
    genre: string;
  };
  search: string;
};

export type InitialStateUserGameType = {
  userGame: UserGameInfo;
  loading: boolean;
};

export type UserGameInfo = {
  __typename: string;
  completedDate: string;
  createdAt: string;
  gameNote: string;
  gameStatus: string;
  id: string;
  review: string;
  startDate: string;
  updatedAt: string;
  private: boolean;
  rating: number;
};
