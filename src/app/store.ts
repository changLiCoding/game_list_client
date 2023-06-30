import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import userReducer from '@/features/userSlice';
import userGamesListReducer from '@/features/userGamesListSlice';
import userGameReducer from '@/features/userGameSlice';
import addedGamesReducer from '@/features/addedGamesSlice';
import homeSearchSlice from '@/features/homeSearchSlice';
import { createGameFiltersSlice } from '@/features/gameFiltersSlice';
import { HomeGameFilters, UserGameFilters } from '@/types/global';
import { bigTest } from '@/features/bigTest';

const defaultGameFilters: HomeGameFilters = {
  genres: [],
  platforms: [],
  tags: [],
  excludedPlatforms: [],
  excludedGenres: [],
  excludedTags: [],
  year: undefined,
  search: '',
  sortBy: 'name',
  state: 'off',
};

const defaultUserGameFilters: UserGameFilters = {
  genres: undefined,
  platforms: undefined,
  tags: undefined,
  year: undefined,
  search: undefined,
  sortBy: undefined,
  selectedList: 'all',
};

const gameFiltersSlice = createGameFiltersSlice({
  name: 'gameFiltersSlice',
  initialState: defaultGameFilters,
  reducers: {},
});

const userGameFiltersSlice = createGameFiltersSlice({
  name: 'userGameFiltersSlice',
  initialState: defaultUserGameFilters,
  reducers: {},
});

const bigTestTest = bigTest();

const rootReducer = combineReducers({
  user: userReducer,
  userGames: userGamesListReducer,
  userGame: userGameReducer,
  homeSearch: homeSearchSlice,

  gameFilters: gameFiltersSlice.reducer,
  bigTest: bigTestTest.reducer,
  userGameFilters: userGameFiltersSlice.reducer,

  addedGames: addedGamesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;

export const {
  incrementItem,
  toggleItem,
  removeItem,
  // clearAll,
  clearCategory,
  setFilters: setTestFilter,
  resetFilter: resetTestFilter,
  reset: resetTestFilters,
} = bigTestTest.actions;

export const {
  setFilters: setGameFilters,
  resetFilter: resetGameFilter,
  reset: resetGameFilters,
} = gameFiltersSlice.actions;
export const {
  setFilters: setUserGameFilters,
  resetFilter: resetUserGameFilter,
  reset: resetUserGameFilters,
} = userGameFiltersSlice.actions;
