import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import helpers from "./helpers";
const centralBankSlice = createSlice({
  name: "centralBank",
  initialState,
  reducers: {
    setBankRate: (state, action) => {
      state.bankRate = action.payload;
    },
    submitCpi: (state, action) => {
      ("hello from setCPI")
      const newCpi = action.payload;
      const newInflationRate = helpers.getInflationRate(newCpi);
      const lastYear = state.inflationByYear[state.inflationByYear.length - 1];
      const newYear = lastYear.year + 1;
      const newRate = parseFloat(newInflationRate);
      const newChange = parseFloat(lastYear.rate.toFixed(2)) + newRate;
      const newElement = { year: newYear, rate: newRate, change: newChange };
      state.cpiData = newCpi;
      state.inflationRate = newInflationRate;
      state.inflationByYear = [...state.inflationByYear, newElement];
    },
  },
});

export const { setBankRate, submitCpi } = centralBankSlice.actions;

export const selectCentralBank = (state) => state.centralBank;

export default centralBankSlice.reducer;
