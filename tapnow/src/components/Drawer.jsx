import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
// import logo from "../imgs/Urbanlogo1.png";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";
import { SiGoogleanalytics } from "react-icons/si";
import { FaShoppingCart } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { BsFillBoxSeamFill, BsInfoSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModal";

const TheDrawer = ({ drawer, handleDrawer }) => {
  let navigate = useNavigate();
  let [modal, setModal] = useState(false);

  let handleModal = () => {
    setModal(!modal);
  };

  let logOut = () => {
    let promise = new Promise((res, rej) => {
      res(localStorage.removeItem("tapNowUid"));
    });

    promise.then(() => {
      navigate("/");
    });
  };

  let help = () => {};

  return (
    <div>
      <Drawer anchor="left" open={drawer} onClose={handleDrawer}>
        <div className="w-[250px] min-h-[100vh]">
          <div className="flex flex-col items-center w-[100%] mt-[25px]">
            {/* <img src={logo} alt="logo" className="h-[50px] w-[200px]" /> */}
            <h2 class=" text-xl font-medium  text-black  ">T A P N O W</h2>
          </div>
          {/*<div className="mt-8 ml-3">
            <div
              className="text-xl font-medium"
              style={{ fontFamily: "Roboto" }}
            >
              Home
            </div>
            <div
              className="text-xl font-medium mt-5"
              style={{ fontFamily: "Roboto" }}
            >
              By Industry
            </div>
            <div
              className="text-xl font-medium mt-5"
              style={{ fontFamily: "Roboto" }}
            >
              Luxury Rigid Boxes
            </div>
            <div
              className="text-xl font-medium mt-5"
              style={{ fontFamily: "Roboto" }}
            >
              By Style
            </div>
            <div
              className="text-xl font-medium mt-5"
              style={{ fontFamily: "Roboto" }}
            >
              Luxury Finishes
            </div>
          </div>

          <div></div> */}
          {/* </div> */}
          {/* </Box> */}

          <Box
            sx={{ width: 250, marginTop: 2 }}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            // onKeyDown={toggleDrawer(anchor, false)}
          >
            <List>
              {[
                {
                  text: "My Profiles",
                  icon: BsFillPersonVcardFill,
                  path: "/home",
                },
                {
                  text: "Contacts",
                  icon: BsFillPeopleFill,
                  path: "/contacts",
                },

                {
                  text: "Analytics",
                  icon: SiGoogleanalytics,
                  path: "/analytics",
                },
                {
                  text: "Shop",
                  icon: FaShoppingCart,
                  path: "/shop",
                },

                {
                  text: "Orders",
                  icon: FaClipboardList,
                  path: "/orders",
                },
                {
                  text: "Settings",
                  icon: AiFillSetting,
                  path: "/settings",
                },
              ].map((text, index) => (
                <ListItem
                  key={text.text}
                  disablePadding
                  onClick={() => navigate(text.path)}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                      {/* {text.icon} */}
                      <text.icon className="text-xl" />
                    </ListItemIcon>
                    <ListItemText primary={text.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {[
                {
                  text: "Help",
                  icon: BiHelpCircle,
                  func: help,
                },
                {
                  text: "Logout",
                  icon: LuLogOut,
                  func: handleModal,
                },
              ].map((text, index) => (
                <ListItem
                  key={index}
                  disablePadding
                  onClick={() => text.func()}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <text.icon className="text-xl" />
                    </ListItemIcon>
                    <ListItemText primary={text.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </div>
      </Drawer>
      <LogoutModal
        modal={modal}
        handleModal={handleModal}
        logoutFunc={logOut}
      />
    </div>
  );
};

export default TheDrawer;
