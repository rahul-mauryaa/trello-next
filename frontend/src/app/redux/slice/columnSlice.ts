import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  columns: [],
};

const columnSlice = createSlice({
  name: "column",
  initialState,
  reducers: {
    setColumns: (state, action) => {
      state.columns = action.payload;
    },
    resetColumns: (state) => {
      state.columns = [];
    },
  },
});

export const { setColumns, resetColumns } = columnSlice.actions;
export default columnSlice.reducer;
