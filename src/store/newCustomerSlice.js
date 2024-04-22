import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  phone: "",
  gender: "",
  shirt: {
    isShirt: false,
    qty: 0,
  },
  pant: {
    isPant: false,
    qty: 0,
  },
};

const newCustomer = createSlice({
  initialState,
  name: "newCustomerRecord",
  reducers: {
    setNewCustomerName: (state, action) => {
      state.name = action.payload;
    },
    setNewCustomerPhone: (state, action) => {
      state.phone = action.payload;
    },
    setNewCustomerGender: (state, action) => {
      state.gender = action.payload;
    },
    setNewCustomerShirt: (state, action) => {
      state.shirt.isShirt = action.payload[0];
      state.shirt.qty = action.payload[1];
    },
    setNewCustomerPant: (state, action) => {
      state.pant.isPant = action.payload[0];
      state.pant.qty = action.payload[1];
    },
  },
});

export const {
  setNewCustomerName,
  setNewCustomerPhone,
  setNewCustomerGender,
  setNewCustomerShirt,
  setNewCustomerPant,
} = newCustomer.actions;
export default newCustomer;


