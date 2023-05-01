import { createSlice } from '@reduxjs/toolkit';
import { Game } from '@/graphql/__generated__/graphql';

const INITIAL_USER_STATE = {
  games: [],
};

type InitialStateType = {
  games: Game[];
};

const initialState: InitialStateType = INITIAL_USER_STATE;

export const userGamesSlice = createSlice({
  name: 'userGames',
  initialState,
  reducers: {
    setUserGames: (state, action) => {
      state.games = action.payload.gamesForAUser;
    },
    deleteUserGames: (state, action) => {
      console.log(state.games);
      state.games = state.games.filter((game) => game.id !== action.payload);
    },
  },
});

export const { setUserGames, deleteUserGames } = userGamesSlice.actions;

export default userGamesSlice.reducer;
