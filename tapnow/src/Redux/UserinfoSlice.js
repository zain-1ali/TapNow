import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo:{
        name:'',
        location:'',
        job:'',
        company:'',
        bio:'',
        colorCode:'#2f80ed',
        profileUrl:'',
        logoImg:'',
        bgImg:'',
        qrLogo:'',
        qrColor:'',
        LeadMode:'',
        formHeader:''

    }
};

export const userinfoSlice = createSlice({
  name: "userInfoHandeler",
  initialState,
  reducers: {
    setName: (state,action) => {
        state.userInfo.name = action.payload;
      
      },
    setLocation: (state,action) => {
        state.userInfo.location = action.payload;
      
    },
    setJob: (state,action) => {
        state.userInfo.job = action.payload;
        
      },
      setCompany: (state,action) => {
        state.userInfo.company = action.payload;
       
      },
      setBio: (state,action) => {
        state.userInfo.bio = action.payload;
      },
      setColor: (state,action) => {
        state.userInfo.colorCode = action.payload;
      },
      setProfileImg: (state,action) => {
        state.userInfo.profileUrl = action.payload;
      },
      setlogoImg: (state,action) => {
        state.userInfo.logoImg = action.payload;
      },
      setBgImg: (state,action) => {
        state.userInfo.bgImg = action.payload;
      },
      setQrLogo: (state,action) => {
        state.userInfo.qrLogo = action.payload;
      },
      setQrColor: (state,action) => {
        state.userInfo.qrColor = action.payload;
      },
      setLeadMode: (state,action) => {
        state.userInfo.qrColor = action.payload;
      },
      setFormHeader: (state,action) => {
        state.userInfo.formHeader = action.payload;
      },

    
  },
});

// Action creators are generated for each case reducer function
export const { setName,setBio,setColor,setCompany,setJob,setLocation,setProfileImg,setlogoImg,setBgImg,setQrLogo,setQrColor,setLeadMode,setFormHeader } = userinfoSlice.actions;

export default userinfoSlice.reducer;
