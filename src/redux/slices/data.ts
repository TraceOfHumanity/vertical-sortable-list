import {createSlice} from "@reduxjs/toolkit";
import { User } from "../../types";
import { users } from "../../users";

const initialState = {
  userArr: users as User[],
};

const sorting = createSlice({
  name: "sorting",
  initialState,
  reducers: {
    setSortingArr: (state, action) => {
      state.userArr = action.payload;
    },
  },
});

export const {setSortingArr} = sorting.actions;
export default sorting.reducer;
