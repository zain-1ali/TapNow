import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allLinks:[]
};

export const LinkSlice = createSlice({
  name: "LinkHandeler",
  initialState,
  reducers: {
    Addlinks: (state,action) => {
        state.allLinks=action.payload
      },
   
    
  },
});

// Action creators are generated for each case reducer function
export const { Addlinks } = LinkSlice.actions;

export default LinkSlice.reducer;