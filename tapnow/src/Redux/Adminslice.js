import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adminData:{}
};

export const adminSlice = createSlice({
  name: "adminHandeler",
  initialState,
  reducers: {
    getData: (state,action) => {
        state.adminData=action.payload
      },
   
    
  },
});

// Action creators are generated for each case reducer function
export const { getData } = adminSlice.actions;

export default adminSlice.reducer;
