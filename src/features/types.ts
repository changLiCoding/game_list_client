import { SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit';
import { GameFiltersSortType } from '@/types/global';

export type GenericGameFilterOptions<T> = {
  name: string;
  initialState: T;
  reducers: ValidateSliceCaseReducers<T, SliceCaseReducers<T>>;
};

export type HomeGameFilters = {
  search: string | undefined;
  genres: {
    included: string[];
    excluded: string[];
  };
  platforms: {
    included: string[];
    excluded: string[];
  };
  tags: {
    included: string[];
    excluded: string[];
  };
  year: number | undefined;
  sortBy: GameFiltersSortType | undefined;
};

export type InitialStateType = {
  loading: boolean;
  user: UserInfo;
};

type UserInfo = {
  id: string;
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
  id: string;
};

export type HomeSearchSlice = {
  view: 'grid' | 'list';
};
