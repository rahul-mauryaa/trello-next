import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  token: null,
  users: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    logout: (state) => {
      state.users = [];
      state.token = null;
    },
  },
});

export const { setToken, setUsers, logout } = authSlice.actions;
export default authSlice.reducer;
