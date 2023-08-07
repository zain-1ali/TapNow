import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import CommingSoon from "../components/CommingSoon";
import { useMediaQuery } from "react-responsive";
import MobileScreenUpper from "../components/MobileScreenUpper";
import TheDrawer from "../components/Drawer";

const Orders = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  let [drawer, setDrawer] = useState(false);

  let handleDrawer = () => {
    setDrawer(!drawer);
    // console.log("test");
  };

  let closeDrawer = () => {
    setDrawer(false);
  };

  return (
    <div className="laptop:flex w-[100%] h-[100vh]">
      {isDesktopOrLaptop && <Sidebar />}
      {isTabletOrMobile && <MobileScreenUpper handleDrawer={handleDrawer} />}
      <TheDrawer drawer={drawer} handleDrawer={closeDrawer} />
      <CommingSoon />
    </div>
  );
};

export default Orders;
