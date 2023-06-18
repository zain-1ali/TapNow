import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    singleLink:{
        name:'',
        img:'',
        placeholder:''
       }
};

export const linkSlice = createSlice({
  name: "singleLinkHandeler",
  initialState,
  reducers: {
    addLink: (state,action) => {
        state.singleLink=action.payload
      },
      
  
      removeLink: (state) => {
        state.singleLink={
          name:'',
          img:'',
          placeholder:''
         }
      },
    
    
  },
});

// Action creators are generated for each case reducer function
export const { addLink,removeLink } = linkSlice.actions;

export default linkSlice.reducer;