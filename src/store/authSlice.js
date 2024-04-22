import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setLoginStatus: (state, action) => {
      state.isLogged = action.payload;
    },
  },
});

export const { setLoginStatus } = authSlice.actions;
export default authSlice;
