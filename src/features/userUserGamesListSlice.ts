import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_USER_GAME_LISTS } from '@/constants';
import { InitialStateUserGamesListType } from './types';

const initialState: InitialStateUserGamesListType = INITIAL_USER_GAME_LISTS;

export const userGamesListSlice = createSlice({
  name: 'userGamesList',
  initialState,
  reducers: {
    setSelectedList: (state, action) => {
      state.selectedList = action.payload;
      if (action.payload === 'all') {
        state.selectedLists = state.listOrder;
      } else {
        state.selectedLists = [action.payload];
      }
    },
    setListOrder: (state, action) => {
      state.listOrder = action.payload;

      if (state.selectedList === 'all') {
        state.selectedLists = action.payload;
      }
    },
  },
});

export const { setSelectedList, setListOrder } = userGamesListSlice.actions;

export default userGamesListSlice.reducer;
