import React, { useEffect, useState } from "react";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";
import { SiGoogleanalytics } from "react-icons/si";
import { FaShoppingCart } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { onValue, ref } from "firebase/database";
import { db } from "../Firebase";

const Sidebar = () => {
  let navigate = useNavigate();
  let userId = localStorage.getItem("tapNowUid");
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
      });
    };

    getingdata();
  }, []);

  let logOut = () => {
    let promise = new Promise((res, rej) => {
      res(localStorage.removeItem("tapNowUid"));
    });

    promise.then(() => {
      navigate("/");
    });
  };

  let currentPath = window.location.href;

  return (
    <div className="w-[15%] min-h-[100vh] border-r flex flex-col sticky">
      <div className="h-[90vh]  w-[100%] flex flex-col justify-between items-center">
        <div className="h-[70%]  w-[90%] flex flex-col justify-between">
          <div className="h-[15%]  w-[100%] flex items-center">
            {/* <img
              src="/assets/taptlogo-b97e16a1.svg"
              alt="Tap Now"
              className="h-7 w-[105px]"
            /> */}
            <h2 class=" text-xl font-medium ml-2 text-black">T A P N O W</h2>
          </div>
          <div className="h-[80%]  w-[100%] flex flex-col justify-between">
            {/* {user?.isAdmin && ( */}
            {/* <div
              style={user?.isAdmin === true ? { display: "none" } : null}
              className="h-[100%]  w-[100%]"
            > */}
            {/* <div
              className="hover:bg-[#b2d9ee] hover:text-[#0b567f] h-[12%]  w-[100%] rounded-md flex items-center"
              onClick={() => navigate("/dashboard")}
              style={
                currentPath.includes("/dashboard")
                  ? { backgroundColor: "#b2d9ee" }
                  : null
              }
            >
              <div className=" flex items-center rounded-md hover:bg-[#b2d9ee] hover:text-[#0b567f] cursor-pointer">
                <MdDashboard className="text-[#0b567f] text-xl ml-2 " />
                <p className="ml-[10px] text-base ">Dashboard</p>
              </div>
            </div> */}
            {/* </div> */}
            {/* )} */}
            <div
              className="hover:bg-[#b2d9ee] hover:text-[#0b567f] h-[12%]  w-[100%] rounded-md flex items-center"
              onClick={() => navigate("/home")}
              style={
                currentPath.includes("/home")
                  ? { backgroundColor: "#b2d9ee" }
                  : null
              }
            >
              <div className=" flex items-center rounded-md hover:bg-[#b2d9ee] hover:text-[#0b567f] cursor-pointer">
                <BsFillPersonVcardFill className="text-[#0b567f] text-xl ml-2 " />
                <p className="ml-[10px] text-base ">My Profiles</p>
              </div>
            </div>
            <div
              className="hover:bg-[#b2d9ee] hover:text-[#0b567f] h-[12%]  w-[100%] rounded-md flex items-center"
              onClick={() => navigate("/contacts")}
              style={
                currentPath.includes("/contacts")
                  ? { backgroundColor: "#b2d9ee" }
                  : null
              }
            >
              <div className=" flex items-center rounded-md hover:bg-[#b2d9ee] hover:text-[#0b567f] cursor-pointer">
                <BsFillPeopleFill className="text-[#0b567f] text-xl ml-2 " />
                <p className="ml-[10px] text-base ">Contacts</p>
              </div>
            </div>
            <div
              className="hover:bg-[#b2d9ee] hover:text-[#0b567f] h-[12%]  w-[100%] rounded-md flex items-center"
              onClick={() => navigate("/analytics")}
              style={
                currentPath.includes("/analytics")
                  ? { backgroundColor: "#b2d9ee" }
                  : null
              }
            >
              <div className=" flex items-center rounded-md hover:bg-[#b2d9ee] hover:text-[#0b567f] cursor-pointer">
                <SiGoogleanalytics className="text-[#0b567f] text-xl ml-2 " />
                <p className="ml-[10px] text-base ">Analytics</p>
              </div>
            </div>
            <div
              className="hover:bg-[#b2d9ee] hover:text-[#0b567f] h-[12%]  w-[100%] rounded-md flex items-center"
              onClick={() => navigate("/shop")}
              style={
                currentPath.includes("/shop")
                  ? { backgroundColor: "#b2d9ee" }
                  : null
              }
            >
              <div className=" flex items-center rounded-md hover:bg-[#b2d9ee] hover:text-[#0b567f] cursor-pointer">
                <FaShoppingCart className="text-[#0b567f] text-xl ml-2 " />
                <p className="ml-[10px] text-base ">Shop</p>
              </div>
            </div>
            <div
              className="hover:bg-[#b2d9ee] hover:text-[#0b567f] h-[12%]  w-[100%] rounded-md flex items-center"
              onClick={() => navigate("/orders")}
              style={
                currentPath.includes("/orders")
                  ? { backgroundColor: "#b2d9ee" }
                  : null
              }
            >
              {" "}
              <div className=" flex items-center rounded-md hover:bg-[#b2d9ee] hover:text-[#0b567f] cursor-pointer">
                <FaClipboardList className="text-[#0b567f] text-xl ml-2 " />
                <p className="ml-[10px] text-base ">Orders</p>
              </div>
            </div>

            <div
              className="hover:bg-[#b2d9ee] hover:text-[#0b567f] h-[12%]  w-[100%] rounded-md flex items-center"
              onClick={() => navigate("/settings")}
              style={
                currentPath.includes("/settings")
                  ? { backgroundColor: "#b2d9ee" }
                  : null
              }
            >
              <div className=" flex items-center rounded-md hover:bg-[#b2d9ee] hover:text-[#0b567f] cursor-pointer">
                <AiFillSetting className="text-[#0b567f] text-xl ml-2 " />
                <p className="ml-[10px] text-base ">Settings</p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[10%]  w-[90%] flex flex-col justify-between">
          <div className="h-[20%]  w-[100%] flex items-center rounded-md cursor-pointer ml-2">
            <BiHelpCircle className="text-gray-500 text-xl " />
            <p className="ml-[10px] text-base text-gray-500">Help</p>
          </div>
          <div
            className="h-[20%]  w-[100%] flex items-center rounded-md cursor-pointer ml-2"
            onClick={() => logOut()}
          >
            <LuLogOut className="text-gray-500 text-xl " />
            <p className="ml-[10px] text-base text-gray-500">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
