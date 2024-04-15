import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  cards: [],
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setCards: (state, action) => {
      state.cards = action.payload;
    },
    resetCards: (state) => {
      state.cards = [];
    },
  },
});

export const { setCards, resetCards } = cardSlice.actions;
export default cardSlice.reducer;
