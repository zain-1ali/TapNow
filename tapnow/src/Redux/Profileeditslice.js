import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isContent: true,
  isAbout: false,
  isQr: false,
  isLead: false,
};

export const profileEditSlice = createSlice({
  name: "profileEditHandeler",
  initialState,
  reducers: {
    openContent: (state) => {
      state.isContent = true;
      state.isAbout = false;
      state.isQr = false;
      state.isLead = false;


    },
    

    openAbout: (state) => {
      state.isAbout = true;
      state.isContent = false;
      state.isQr = false;
      state.isLead = false;



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
