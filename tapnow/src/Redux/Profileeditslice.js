import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 singleLink:{
  name:'',
  img:'',
  placeholder:''
 }
};

export const profileEditSlice = createSlice({
  name: "profileEditHandeler",
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
   

    openQr: (state) => {
        state.isAbout = false
        state.isContent = false;
        state.isQr = true;
        state.isLead = false;
    },
    

    openLead: (state) => {
        state.isAbout = false
        state.isContent = false;
        state.isQr = false;
        state.isLead = true;
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { openContent,openAbout,openQr,openLead } = profileEditSlice.actions;

export default profileEditSlice.reducer;
