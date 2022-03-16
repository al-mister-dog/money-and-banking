import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setDepartment: (state, action) => {
      state.department = action.payload;
      return state;
    },
    setDepartmentOperation: (state, action) => {
      state.departmentOperation = action.payload;
      return state;
    },
  },
});

export const { setDepartment, setDepartmentOperation } = navSlice.actions;

export const navSelector = (state) => state.nav;

export default navSlice.reducer;
