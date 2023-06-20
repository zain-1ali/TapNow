import React from "react";
import {MdOutlineOpenInNew} from 'react-icons/md'
import Mobile from "./Mobile";
import { CircularProgress } from "@mui/material";

const Mobilecontainer = ({user,link}) => {
  return (
    <div className="h-[540px] rounded-r-2xl bg-white w-[320px] mt-5 flex items-center flex-col overflow-y-scroll scrollbar-hide shadow-xl">
      {
        user?.id ?
      
      <>
     
      
      <div class="w-[100%] h-[55px]  mt-[22px] flex justify-center">
        <div class="w-[135px] h-[40px] border rounded-3xl  flex justify-center items-center text-sm cursor-pointer">
          <MdOutlineOpenInNew/>
          <p class="ml-1">View Card</p>
        </div>


      </div>
      <Mobile user={user} link={link}/>
      </>
      :
      <div className="w-[320px] h-[540px] flex justify-center items-center">
      <CircularProgress/>
    </div>

}


    </div>
  );
};

export default Mobilecontainer;
