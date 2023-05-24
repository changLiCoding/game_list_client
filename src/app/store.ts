import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from '@/features/userSlice';
import userGamesListReducer from '@/features/userUserGamesListSlice';
import userGameReducer from '@/features/userGameSlice';
import homeSearchSlice from '@/features/homeSearchSlice';
import gameFiltersSlice from '@/features/gameFiltersSlice';

const rootReducer = combineReducers({
  user: userReducer,
  userGames: userGamesListReducer,
  userGame: userGameReducer,
  homeSearch: homeSearchSlice,
  gameFilters: gameFiltersSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

setupListeners(store.dispatch);
