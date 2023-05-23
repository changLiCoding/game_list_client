import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_USER_GAME_BY_ID_STATE } from '@/constants';
import { InitialStateUserGameType } from '@/features/types';

const initialState: InitialStateUserGameType = INITIAL_USER_GAME_BY_ID_STATE;

export const userGameSlice = createSlice({
  name: 'userGame',
  initialState,
  reducers: {
    setUserGameStatus: (state, action) => {
      state.gameStatus = action.payload;
    },
    setUserGameNote: (state, action) => {
      state.gameNote = action.payload;
    },
    setUserGameRating: (state, action) => {
      state.rating = action.payload;
    },
    setUserGamePrivate: (state, action) => {
      state.private = action.payload;
    },
    setUserGameCompletedDate: (state, action) => {
      state.completedDate = action.payload === '' ? null : action.payload;
    },
    setUserGameStartDate: (state, action) => {
      state.startDate = action.payload === '' ? null : action.payload;
    },
    setUserGameReview: (state, action) => {
      state.review = action.payload;
    },
    setUserGame: (state, action) => {
      const {
        gameStatus,
        gameNote,
        rating,
        private: isPrivate,
        completedDate,
        startDate,
        review,
      } = action.payload;

      state.gameStatus = gameStatus;
      state.gameNote = gameNote;
      state.rating = rating;
      state.private = isPrivate;
      state.completedDate = completedDate === '' ? null : completedDate;
      state.startDate = startDate === '' ? null : startDate;
      state.review = review;
    },
    setUserGameAdded: (state, action) => {
      if (action.payload.type === 'add') {
        state.isGameAdded = true;
      } else if (action.payload.type === 'remove') {
        state.isGameAdded = false;
      }
    },
  },
});

export const {
  setUserGame,
  setUserGameCompletedDate,
  setUserGameNote,
  setUserGamePrivate,
  setUserGameRating,
  setUserGameReview,
  setUserGameStartDate,
  setUserGameStatus,
  setUserGameAdded,
} = userGameSlice.actions;

export default userGameSlice.reducer;
