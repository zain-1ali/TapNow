import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProfileEditing from "../components/SettingsComponent/ProfileEditing";
import Organization from "../components/SettingsComponent/Organization";
import { onValue, ref } from "firebase/database";
import { db } from "../Firebase";
import TheDrawer from "../components/Drawer";
import MobileScreenUpper from "../components/MobileScreenUpper";
import { useMediaQuery } from "react-responsive";

const Settings = ({ userId }) => {
  let [value, setValue] = useState(0);

  let handleTabs = (e, val) => {
    setValue(val);
  };

  // let userId=localStorage.getItem('tapNowUid')
  let [user, setuser] = useState({});
  // --------------------------geting the user data from firebase------------------------

  useEffect(() => {
    let getingdata = async () => {
      const starCountRef = ref(db, `/User/${userId}`);
      onValue(starCountRef, async (snapshot) => {
        const data = await snapshot.val();
        //  console.log(data)
        // MediaKeyStatusMap
        setuser(data);

        // updateStarCount(postElement, data);
      });
    };

    getingdata();
  }, []);

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
    <div className="laptop:flex w-[100%]">
      {isDesktopOrLaptop && <Sidebar />}
      {isTabletOrMobile && <MobileScreenUpper handleDrawer={handleDrawer} />}
      <TheDrawer drawer={drawer} handleDrawer={closeDrawer} />

      <div className="w-[100%] flex items-center flex-col">
        <div class=" w-[100%] h-[100px] mt-[35px] flex justify-center">
          <div class="w-[95%] flex justify-between">
            <h2 class="text-4xl font-[500]">Settings</h2>
          </div>
        </div>

        <div className="w-[90%]">
          <Tabs value={value} onChange={handleTabs}>
            <Tab label="Organization" />
            <Tab label="Profile & Editing" />
          </Tabs>

          <Tabpanel value={value} index={0}>
            <Organization user={user} />
          </Tabpanel>
          <Tabpanel value={value} index={1}>
            <ProfileEditing user={user} />
          </Tabpanel>
        </div>
      </div>
    </div>
  );
};

let Tabpanel = ({ children, value, index }) => {
  return <div>{value === index && children}</div>;
};

export default Settings;
