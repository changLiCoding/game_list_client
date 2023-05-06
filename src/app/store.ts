import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from '@/features/userSlice';
import userGamesListReducer from '@/features/userUserGamesListSlice';

const rootReducer = combineReducers({
  user: userReducer,
  userGames: userGamesListReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

setupListeners(store.dispatch);
