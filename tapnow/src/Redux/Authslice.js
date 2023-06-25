import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated:false
};

export const authSlice = createSlice({
  name: "authHandeler",
  initialState,
  reducers: {
    login: (state) => {
        state.isAuthenticated=true
      },
    logout: (state) => {
        state.isAuthenticated=false
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { openLinkModal,openLinkEditModal,openLinkUpdateModal,openModal,closeAllModal } = authSlice.actions;

export default authSlice.reducer;
