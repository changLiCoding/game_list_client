import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_USER_GAME_BY_ID_STATE } from '@/constants';
import { InitialStateUserGameType } from '@/features/types';

const initialState: InitialStateUserGameType = INITIAL_USER_GAME_BY_ID_STATE;

export const userGameSlice = createSlice({
  name: 'userGame',
  initialState,
  reducers: {
    setUserGameReducer: (state, action) => {
      const { type, payload } = action.payload;

      if (type === 'gameStatus') {
        if (payload === 'Inactive') {
          state.id = '';
          state.gameStatus = '';
          state.gameNote = '';
          state.rating = 0;
          state.private = false;
          state.completedDate = null;
          state.startDate = null;
        } else {
          state.gameStatus = payload;
        }
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
          id,
        } = payload;

        if (gameStatus === 'Inactive') {
          state.id = '';
          state.gameStatus = '';
          state.gameNote = '';
          state.rating = 0;
          state.private = false;
          state.completedDate = null;
          state.startDate = null;
        } else {
          state.id = id;
          state.gameStatus = gameStatus;
          state.gameNote = gameNote;
          state.rating = rating;
          state.private = isPrivate;
          state.completedDate = completedDate === '' ? null : completedDate;
          state.startDate = startDate === '' ? null : startDate;
        }
      } else if (type === 'reset') {
        Object.assign(state, INITIAL_USER_GAME_BY_ID_STATE);
      }
    },
  },
});

export const { setUserGameReducer } = userGameSlice.actions;

export default userGameSlice.reducer;
