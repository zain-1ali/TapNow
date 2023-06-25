import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    singleLink:{
        name:'',
        img:'',
        placeholder:'',
        isHighlighted:'',
       }
};

export const linkSlice = createSlice({
  name: "singleLinkHandeler",
  initialState,
  reducers: {
    addLink: (state,action) => {
        state.singleLink=action.payload
      },
      changeLinkName: (state,action) => {
        state.singleLink.name=action.payload
      },
      changeHighlight: (state,action) => {
        state.singleLink.isHighlighted=action.payload
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
export const { addLink,removeLink,changeLinkName,changeHighlight } = linkSlice.actions;

export default linkSlice.reducer;
