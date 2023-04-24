import { createSlice } from "@reduxjs/toolkit";
import { InitialStateType } from "../types/user";

const initialState: InitialStateType = {
  username: "",
  bannerPicture: "",
  createdAt: "",
  email: "",
  games: [],
  isActive: false,
  userGames: [],
  userPicture: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      delete action.payload.__typename;
      state.username = action.payload["username"];
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
