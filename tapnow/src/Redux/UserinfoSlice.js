import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo:{
        name:'',
        location:'',
        job:'',
        company:'',
        bio:'',
        colorCode:'',
        profileUrl:'',
        logoImg:'',
        bgImg:''

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
    
  },
});

// Action creators are generated for each case reducer function
export const { setName,setBio,setColor,setCompany,setJob,setLocation,setProfileImg,setlogoImg,setBgImg } = userinfoSlice.actions;

export default userinfoSlice.reducer;
