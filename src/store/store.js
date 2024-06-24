import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import newCustomer from "./newCustomerSlice";
import newCustomerNext from "./newCustomerSliceNext";
import totalCustomerCountSlice from "./totalCustomerCountSlice";

export const store = configureStore({
  reducer: {
    authentication: authSlice.reducer,
    newCustomerRecord: newCustomer.reducer,
    newCustomerRecordNext: newCustomerNext.reducer,
    totalCustomerCount: totalCustomerCountSlice.reducer,
  },
});
