import { createSlice } from '@reduxjs/toolkit';

const initialState: { isUserGameEdited: boolean } = {
  isUserGameEdited: false,
};

// TODO: REMOVE THIS SLICE, LEAVE ADDGAME STATE MANAGMENT TO APOLLO CACHE
export const addedGamesSlice = createSlice({
  name: 'addedGames',
  initialState,
  reducers: {
    setIsUserGameEdited: (state, action) => {
      if (action.payload.type === 'edit') {
        state.isUserGameEdited = true;
      } else if (action.payload.type === 'reset') {
        state.isUserGameEdited = false;
      }
    },
  },
});

export const { setIsUserGameEdited } = addedGamesSlice.actions;

export default addedGamesSlice.reducer;
