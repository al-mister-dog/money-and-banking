import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
});

// export const { setDepartment, setDepartmentOperation } = countriesSlice.actions;

export const countriesSelector = (state) => state.countries;

export default countriesSlice.reducer;
