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
    setInitialState: (state, action) => {
      state.listOrder = action.payload;
      state.localListOrder = action.payload;
      state.selectedLists = action.payload;
    },
    setListOrder: (state) => {
      state.listOrder = state.localListOrder;

      if (state.selectedList === 'all') {
        state.selectedLists = state.localListOrder;
      }
    },
    setLocalListOrder: (state, action) => {
      state.localListOrder = action.payload;
    },
    resetLocalListOrder: (state) => {
      state.localListOrder = state.listOrder;
    },
  },
});

export const {
  setSelectedList,
  setInitialState,
  setListOrder,
  setLocalListOrder,
  resetLocalListOrder,
} = userGamesListSlice.actions;

export default userGamesListSlice.reducer;
