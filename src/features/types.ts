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
  listOrder: string[];
  localListOrder: string[];
};

export type InitialStateUserGameType = {
  completedDate: string | null;
  gameNote: string;
  gameStatus: string;
  startDate: string | null;
  private: boolean;
  rating: number;
};

export type HomeSearchSlice = {
  filters: {
    platforms: string[];
    tags: string[];
    genres: string[];
    year: number;
  };
  lastSelected: {
    platforms: string;
    tags: string;
    genres: string;
  };
  view: 'grid' | 'list';
};
