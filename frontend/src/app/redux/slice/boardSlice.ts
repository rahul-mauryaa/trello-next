import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  boards: [],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload;
    },
    resetBoards: (state) => {
      state.boards = [];
    },
  },
});

export const { setBoards, resetBoards } = boardSlice.actions;
export default boardSlice.reducer;
