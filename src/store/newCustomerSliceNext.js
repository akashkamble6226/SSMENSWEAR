import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deliveryDate: "",
  letKnowDate: "",

  totalAmount: "",
  advanceAmount: "",
  remainingAmount: "",

  pocketCount: "",
  collarType: "",

  length: "",
  lengthSize: 0,

  chest: "",
  chestSize: 0,

  weist: "",
  weistSize: 0,

  shoulder: "",
  shoulderSize: 0,

  collar: "",
  collarSize: 0,

  lengthOfHand: "",
  lengthOfHandSize: 0,

  handFourSide: "",
  lengtOfHandFourSideSize: 0,

  wrist: "",
  wriestSize: 0,

  hip: "",
  hipSize: 0,
};

const newCustomerNext = createSlice({
  initialState,
  name: "newCustomerRecordNext",
  reducers: {
    // date
    setDeliveryDate: (state, action) => {
      state.deliveryDate = action.payload;
    },
    setDueDate: (state, action) => {
      state.letKnowDate = action.payload;
    },
    // amount
    setTotalAmt: (state, action) => {
      state.totalAmount = action.payload;
    },
    setAdvanceAmount: (state, action) => {
      state.advanceAmount = action.payload;
    },
    setRemainingAmount: (state, action) => {
      state.remainingAmount = action.payload;
    },

    // pocket
    setPocketCountState: (state, action) => {
      state.pocketCount = action.payload;
    },
    // collar type
    setCollarTypeState: (state, action) => {
      state.collarType = action.payload;
    },

    // shirt
    setLength: (state, action) => {
      state.length = action.payload;
    },

    setLengthSizeState: (state, action) => {
      state.lengthSize = action.payload;
    },

    setChest: (state, action) => {
      state.chest = action.payload;
    },

    setChestSizeState: (state, action) => {
      state.chestSize = action.payload;
    },

    setWeist: (state, action) => {
      state.weist = action.payload;
    },

    setWeistSizeState: (state, action) => {
      state.weistSize = action.payload;
    },

    setShoulder: (state, action) => {
      state.shoulder = action.payload;
    },

    setShoulderSizeState: (state, action) => {
      state.shoulderSize = action.payload;
    },

    setCollar: (state, action) => {
      state.collar = action.payload;
    },

    setCollarSizeState: (state, action) => {
      state.collarSize = action.payload;
    },

    setLengthOfHand: (state, action) => {
      state.lengthOfHand = action.payload;
    },

    setLengthOfHandSizeState: (state, action) => {
      state.lengthOfHandSize = action.payload;
    },

    setHandFourSide: (state, action) => {
      state.handFourSide = action.payload;
    },

    setHandFourSideSizeState: (state, action) => {
      state.lengtOfHandFourSideSize = action.payload;
    },

    setWrist: (state, action) => {
      state.wrist = action.payload;
    },

    setWristSizeState: (state, action) => {
      state.wriestSize = action.payload;
    },

    setHip: (state, action) => {
      state.hip = action.payload;
    },

    setHipSizeState: (state, action) => {
      state.hipSize = action.payload;
    },
  },
});

export const {
  setDeliveryDate,
  setDueDate,
  setTotalAmt,
  setAdvanceAmount,
  setRemainingAmount,
  setPocketCountState,
  setCollarTypeState,

  setLength,
  setLengthSizeState,
  setChest,
  setChestSizeState,
  setWeist,
  setWeistSizeState,
  setShoulder,
  setShoulderSizeState,
  setCollar,
  setCollarSizeState,
  setLengthOfHand,
  setLengthOfHandSizeState,
  setHandFourSide,
  setHandFourSideSizeState,
  setWrist,
  setWristSizeState,
  setHip,
  setHipSizeState,
} = newCustomerNext.actions;
export default newCustomerNext;
