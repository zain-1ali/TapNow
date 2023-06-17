import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modal:false,
  linkmodal:false,
linkeditmodal:false,
linkupdateModal:false
};

export const modalSlice = createSlice({
  name: "modalHandeler",
  initialState,
  reducers: {
    openModal: (state) => {
        state.modal = true;
        state.linkmodal = true;
      },
    openLinkModal: (state) => {
      state.linkmodal = true;
      state.linkeditmodal = false;
      state.linkupdateModal = false;
    },
    openLinkEditModal: (state) => {
        state.linkmodal = false;
        state.linkeditmodal = true;
        state.linkupdateModal = false;
      },
      openLinkUpdateModal: (state) => {
        state.linkmodal = false;
        state.linkeditmodal = false;
        state.linkupdateModal = true;
      },
      closeAllModal: (state) => {
        state.modal = false;
        state.linkmodal = false;
        state.linkeditmodal = false;
        state.linkupdateModal = false;
      },
    
  },
});

// Action creators are generated for each case reducer function
export const { openLinkModal,openLinkEditModal,openLinkUpdateModal,openModal,closeAllModal } = modalSlice.actions;

export default modalSlice.reducer;
