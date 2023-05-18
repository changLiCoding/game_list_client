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
};

export type HomeSearchSlice = {
  filters: {
    platforms: string[];
    tags: string[];
    genres: string[];
  };
  lastSelected: {
    platforms: string;
    tags: string;
    genres: string;
  };
};
