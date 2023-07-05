import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isAuthenticated:localStorage.getItem('tapNowUid') || null,
};

export const authSlice = createSlice({
  name: "authHandeler",
  initialState,
  reducers: {
    setAuth: (state , action) => {
        state.isAuthenticated=action.payload
      },
    
  },
});



// Action creators are generated for each case reducer function
export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
