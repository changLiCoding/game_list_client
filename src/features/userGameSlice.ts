import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_USER_GAME_BY_ID_STATE } from '@/constants';
import { InitialStateUserGameType } from '@/features/types';

const initialState: InitialStateUserGameType = INITIAL_USER_GAME_BY_ID_STATE;

export const userGameSlice = createSlice({
  name: 'userGame',
  initialState,
  reducers: {
    setUserGame: (state, action) => {
      state.userGame = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUserGame, setLoading } = userGameSlice.actions;

export default userGameSlice.reducer;
