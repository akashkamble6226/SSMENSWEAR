import { Slice, createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalCustomerCount: 0,
};

const totalCustomerCountSlice = createSlice({
  name: "totalCustomerCount",
  initialState,
  reducers: {
    totalCustomerCountStatus: (state, action) => {
      state.totalCustomerCount = action.payload;
    },
  },
});

export const { totalCustomerCountStatus } = totalCustomerCountSlice.actions;
export default totalCustomerCountSlice;
