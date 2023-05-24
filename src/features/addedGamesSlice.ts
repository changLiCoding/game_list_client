import { createSlice } from '@reduxjs/toolkit';

const initialState: { addedList: string[] } = { addedList: [] };

export const addedGamesSlice = createSlice({
  name: 'addedGames',
  initialState,
  reducers: {
    setAddedGames: (state, action) => {
      if (action.payload.type === 'add') {
        state.addedList.push(action.payload.gameId);
      } else if (action.payload.type === 'remove') {
        state.addedList = state.addedList.filter(
          (id) => id !== action.payload.gameId
        );
      }
    },
  },
});

export const { setAddedGames } = addedGamesSlice.actions;

export default addedGamesSlice.reducer;
