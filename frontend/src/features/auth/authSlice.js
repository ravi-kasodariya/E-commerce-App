import { createSlice } from "@reduxjs/toolkit";

// Initial state for the auth slice
const initialState = {
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state, action) => {
      state.token = "";
    },
  },
});

// Export actions for dispatching
export const { setToken, removeToken } = authSlice.actions;

// Export reducer to be used in the store
export default authSlice.reducer;
