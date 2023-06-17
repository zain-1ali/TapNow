import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Mobilecontainer from "./Editprofilecomponents/Mobilecontainer";
import Mobile from "./Editprofilecomponents/Mobile";
import { MdArrowBackIosNew } from "react-icons/md";
import { Switch } from "@mui/material";
import {
  openLinkModal,
  openLinkEditModal,
  openLinkUpdateModal,
  openModal,
  closeAllModal,
} from "../Redux/Modalslice";
import { addLink, removeLink } from "../Redux/Singlelinkslice";

const Linkeditmodal = ({ user, link }) => {
  let dispatch = useDispatch();


  let [theLink,settheLink] = useState({
    isHide: false,
    isHighLighted: false,
    name: "",
    title: "",
    value: "",
    description:''
  });

  // ----------------------------------------------------State from redux---------------------------------------------
  const singlelink = useSelector(
    (state) => state.singleLinkHandeler.singleLink
  );

 

  return (
    <>
      <div className="flex w-[100%] h-[100%]">
        <div className="w-[65%]">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => dispatch(openLinkModal())}
          >
            {/* <svg
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall cursor-pointer css-1k33q06"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="ArrowBackIosNewIcon"
          >
            <path d="M17.77 3.77 16 2 6 12l10 10 1.77-1.77L9.54 12z"></path>
          </svg> */}
            <MdArrowBackIosNew className="cursor-pointer" />
            <p className="ml-1">Back</p>
          </div>
          <img
            src={singlelink.img}
            alt="fb"
            className="h-[70px] w-[70px] mt-6 ml-3"
          />
          <div className="flex mt-3 items-center ml-2">
            {/* <span className="MuiSwitch-root MuiSwitch-sizeMedium css-ecvcn9">
            <span className="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary css-1nr2wod">
              <input
                className="PrivateSwitchBase-input MuiSwitch-input css-1m9pwf3"
                type="checkbox"
              />
              <span className="MuiSwitch-thumb css-19gndve"></span>
              <span className="MuiTouchRipple-root css-w0pj6f"></span>
            </span>
            <span className="MuiSwitch-track css-1ju1kxc"></span>
          </span> */}
            <Switch
            // checked={elm?.isHide}
            // onChange={() =>
            //   handleHidelLink(elm?.title, elm?.isHide)
            // }
            />
            <p className="ml-1 text-sm font-medium">Highlight</p>
          </div>
          <div className="mt-5">
            <h3 className="text-sm font-medium">{singlelink.placeholder}</h3>
            <input
              type="text"
              placeholder="Phone number"
              className="mt-2 outline-none border-none w-[500px] h-[50px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
              onChange={(e)=>settheLink({...theLink,value:e.target.value})}
              value={theLink.value}
            />
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-medium">Link Title*</h3>
            <input
              type="text"
              placeholder={singlelink.name}
              className="mt-2 outline-none border-none w-[500px] h-[50px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
              onChange={(e)=>settheLink({...theLink,name:e.target.value})}
              value={theLink.name}
            />
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium">Description</h3>
            <input
              type="text"
              placeholder="description"
              className="mt-2 outline-none border-none w-[500px] h-[50px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
              onChange={(e)=>settheLink({...theLink,description:e.target.value})}
              value={theLink.description}
            />
          </div>
          
          <div className="w-[55%] h-[70px]  absolute bottom- flex flex-row-reverse ">
            <div className="flex justify-between items-center w-[250px]">
              <div className="h-[40px] w-[100px] border rounded-3xl mr-2 flex items-center justify-center cursor-pointer bg-white">
                <p className="text-sm font-medium ml-[3px] ">Cancel</p>
              </div>
              <div className="h-[40px] w-[120px] border rounded-3xl ml-2 bg-[#f7f7f7]  flex items-center justify-center cursor-pointer">
                <p className="text-sm font-medium ml-[3px] text-gray-400 ">
                  Update
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[35%] h-[100%] border-l relative ">
          <div className="w-[100%] flex justify-center h-[100%] items-center overflow-y-scroll scrollbar-hide pt-10">
            <Mobile user={user} link={link} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Linkeditmodal;
