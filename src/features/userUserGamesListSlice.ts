import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_USER_GAME_LISTS } from '@/constants';

const initialState: string[] = INITIAL_USER_GAME_LISTS;

export const userGamesListSlice = createSlice({
  name: 'userGamesList',
  initialState,
  reducers: {
    setListOrder: (state, action) => {
      if (action.payload[0] === 'all') {
        return INITIAL_USER_GAME_LISTS;
      }
      return action.payload;
    },
  },
});

export const { setListOrder } = userGamesListSlice.actions;

export default userGamesListSlice.reducer;
