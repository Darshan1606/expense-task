import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "auth/session",
  initialState: {
    token: "",
    signedIn: false,
  },
  reducers: {
    onSignInSuccess: (state, action) => {
      state.signedIn = true;
      state.token = action.payload;
    },
    onSignOutSuccess: (state) => {
      state.signedIn = false;
      state.token = "";
    },
  },
});

export const { onSignInSuccess, onSignOutSuccess } = sessionSlice.actions;

export default sessionSlice.reducer;
