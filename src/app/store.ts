import {
  PreloadedState,
  combineReducers,
  configureStore,
  createListenerMiddleware,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from '@/features/userSlice';
import userGamesListReducer from '@/features/userGamesListSlice';
import userGameReducer from '@/features/userGameSlice';
import addedGamesReducer from '@/features/addedGamesSlice';
import homeSearchSlice from '@/features/homeSearchSlice';
import { createGameFiltersSlice } from '@/features/gameFiltersSlice';
import { HomeGameFilters, UserGameFilters } from '@/types/global';
import { createBigTest } from '@/features/bigTest';

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

const gameFiltersSlice = createGameFiltersSlice<HomeGameFilters>(
  'gameFiltersSlice',
  defaultGameFilters
);
const userGameFiltersSlice = createGameFiltersSlice<UserGameFilters>(
  'userGameFiltersSlice',
  defaultUserGameFilters
);

export const listenerMiddleware = createListenerMiddleware();

const bigTest = createBigTest();
const rootReducer = combineReducers({
  user: userReducer,
  userGames: userGamesListReducer,
  userGame: userGameReducer,
  homeSearch: homeSearchSlice,

  // gameFilters: gameFiltersSlice,
  gameFilters: gameFiltersSlice.reducer,
  bigTest: bigTest.reducer,
  userGameFilters: userGameFiltersSlice.reducer,

  addedGames: addedGamesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
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
  toggleItem,
  setFilters: setTestFilter,
  resetFilter: resetTestFilter,
  reset: resetTestFilters,
} = bigTest.actions;

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

setupListeners(store.dispatch);
