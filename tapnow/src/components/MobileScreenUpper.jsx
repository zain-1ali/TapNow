import React from "react";
import { HiMenuAlt2 } from "react-icons/hi";

const MobileScreenUpper = ({ handleDrawer }) => {
  return (
    <div className="w-[100%] h-[60px]  border shadow-md flex items-center">
      <HiMenuAlt2 className="ml-2 text-3xl" onClick={() => handleDrawer()} />
      <h2 className="ml-4 text-lg">T A P N O W</h2>
    </div>
  );
};

export default MobileScreenUpper;
