import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_USER_GAME_BY_ID_STATE } from '@/constants';
import { InitialStateUserGameType } from '@/features/types';

const initialState: InitialStateUserGameType = INITIAL_USER_GAME_BY_ID_STATE;

// TODO: Add types to refector the reducer
export const userGameSlice = createSlice({
  name: 'userGame',
  initialState,
  reducers: {
    setUserGameReducer: (state, action) => {
      const { type, payload } = action.payload;

      if (type === 'gameStatus') {
        state.gameStatus = payload;
      } else if (type === 'gameNote') {
        state.gameNote = payload;
      } else if (type === 'rating') {
        state.rating = payload;
      } else if (type === 'private') {
        state.private = payload;
      } else if (type === 'completedDate') {
        state.completedDate = payload === '' ? null : payload;
      } else if (type === 'startDate') {
        state.startDate = payload === '' ? null : payload;
      } else if (type === 'userGame') {
        const {
          gameStatus,
          gameNote,
          rating,
          private: isPrivate,
          completedDate,
          startDate,
        } = payload;
        state.gameStatus = gameStatus;
        state.gameNote = gameNote;
        state.rating = rating;
        state.private = isPrivate;
        state.completedDate = completedDate === '' ? null : completedDate;
        state.startDate = startDate === '' ? null : startDate;
      }
    },
    resetUserGameReducer: (state) => {
      state.gameStatus = '';
      state.gameNote = '';
      state.rating = 0;
      state.private = false;
      state.completedDate = null;
      state.startDate = null;
    },
  },
});

export const { setUserGameReducer, resetUserGameReducer } =
  userGameSlice.actions;

export default userGameSlice.reducer;
