import React from "react";
import {MdOutlineOpenInNew} from 'react-icons/md'
import Mobile from "./Mobile";

const Mobilecontainer = ({user,link}) => {
  return (
    <div className="h-[540px] rounded-r-2xl bg-white w-[320px] mt-5 flex items-center flex-col overflow-y-scroll scrollbar-hide shadow-xl">
      <div class="w-[100%] h-[55px]  mt-[22px] flex justify-center">
        <div class="w-[135px] h-[40px] border rounded-3xl  flex justify-center items-center text-sm cursor-pointer">
          <MdOutlineOpenInNew/>
          <p class="ml-1">View Card</p>
        </div>


      </div>
      <Mobile user={user} link={link}/>
    </div>
  );
};

export default Mobilecontainer;
