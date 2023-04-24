import { createSlice } from "@reduxjs/toolkit";
import { InitialStateType } from "../types/user";
import { INITIAL_USER_STATE } from "../constants";

const initialState: InitialStateType = INITIAL_USER_STATE;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
