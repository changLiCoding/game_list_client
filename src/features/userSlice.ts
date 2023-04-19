import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
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
      console.log("first");
      console.log(action.payload);
      delete action.payload.__typename;
      console.log("first");

      state.username = action.payload["username"];
      console.log("state");
      console.log(state);
      console.log("state");
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
