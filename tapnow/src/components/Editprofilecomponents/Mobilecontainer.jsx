import React from "react";
import { MdOutlineOpenInNew } from "react-icons/md";
import Mobile from "./Mobile";
import { CircularProgress } from "@mui/material";

const Mobilecontainer = ({ user, link }) => {
  let openProfile = () => {
    window.open(
      `https://64ad38d81eab7a15ab5ad2b5--jolly-brigadeiros-9ab0fa.netlify.app/${user?.userName}`
    );
    // ${import.meta.env.VITE_PROFILE_URL}
  };
  return (
    <div className="h-[540px] 2xl:h-[740px] desktop:h-[1100px] rounded-r-2xl bg-white w-[27%] mt-5 flex items-center flex-col overflow-y-scroll  scrollbar-hide shadow-xl">
      {user?.id ? (
        <>
          <div class="w-[100%] h-[55px]  mt-[22px] flex justify-center">
            <div
              class="w-[135px] h-[40px] border rounded-3xl  flex justify-center items-center text-sm cursor-pointer "
              onClick={() => openProfile()}
            >
              <MdOutlineOpenInNew />
              <p class="ml-1">View Card</p>
            </div>
          </div>
          <Mobile user={user} link={link} />
        </>
      ) : (
        <div className="w-[320px] h-[540px] flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Mobilecontainer;
