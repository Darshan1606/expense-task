import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "auth/user",
  initialState: {},
  reducers: {
    setUser: (_, action) => action.payload,
    userLoggedOut: () => {},
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
