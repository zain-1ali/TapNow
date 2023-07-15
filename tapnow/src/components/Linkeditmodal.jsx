import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Mobilecontainer from "./Editprofilecomponents/Mobilecontainer";
import Mobile from "./Editprofilecomponents/Mobile";
import { MdArrowBackIosNew } from "react-icons/md";
import { Switch } from "@mui/material";
import { update, ref, set } from "firebase/database";

import {
  openLinkModal,
  openLinkEditModal,
  openLinkUpdateModal,
  openModal,
  closeAllModal,
} from "../Redux/Modalslice";
import { addLink, removeLink, changeLinkName } from "../Redux/Singlelinkslice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { db } from "../Firebase";
import { setLinkHighlight, setLinkDescription } from "../Redux/UserinfoSlice";

const Linkeditmodal = ({ user, link }) => {
  let dispatch = useDispatch();
  // ----------------------------------------------------State from redux---------------------------------------------
  const singlelink = useSelector(
    (state) => state.singleLinkHandeler.singleLink
  );

  let [theLink, settheLink] = useState({
    isHide: false,
    isHighLighted: false,
    name: singlelink.name,
    title: "",
    value: "",
    description: "",
  });

  // ----------------------------------------------------handle Link Hihlight---------------------------------------------

  let handleLinkHihlight = () => {
    if (theLink.isHighLighted) {
      settheLink({ ...theLink, isHighLighted: false });
      dispatch(setLinkHighlight(false));
    } else {
      settheLink({ ...theLink, isHighLighted: true });
      dispatch(setLinkHighlight(true));
    }
  };
  // ------------------------------------------Validation Function----------------------------------------------

  let isURL = (str) => {
    // Regular expression pattern for URL validation
    const urlPattern =
      /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)+(?:\/[\w-]+)*\/?$/;

    // Test the string against the pattern
    return urlPattern.test(str);
  };

  // ----------------------------------------------------Add link to database---------------------------------------------

  const addData = (title) => {
    if (theLink.value && theLink.name) {
      if (
        title.includes("Link") ||
        title.includes("link") ||
        title.includes("Url")
      ) {
        if (isURL(theLink.value)) {
          if (link) {
            set(ref(db, `User/${user?.id}/links/`), [...link, theLink]).then(
              () => {
                toast.success("Link added successfuly");
                dispatch(openLinkModal());
                dispatch(removeLink());
                dispatch(setLinkHighlight(false));
                dispatch(setLinkDescription(""));
                settheLink({
                  isHide: false,
                  isHighLighted: false,
                  name: singlelink.name,
                  title: "",
                  value: "",
                  description: "",
                });
              }
            );
          }
        } else {
          toast.error("Invalid url or link");
        }
      } else {
        if (link) {
          set(ref(db, `User/${user?.id}/links/`), [...link, theLink]).then(
            () => {
              toast.success("Link added successfuly");
              dispatch(openLinkModal());
              dispatch(removeLink());
              dispatch(setLinkHighlight(false));
              dispatch(setLinkDescription(""));
              settheLink({
                isHide: false,
                isHighLighted: false,
                name: singlelink.name,
                title: "",
                value: "",
                description: "",
              });
            }
          );
        }
      }
    }
  };

  return (
    <>
      <div className="flex w-[100%] h-[100%]">
        <div className="w-[65%] p-[30px]">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              dispatch(openLinkModal()),
                dispatch(removeLink()),
                dispatch(setLinkHighlight(false)),
                dispatch(setLinkDescription(""));
            }}
          >
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
              checked={theLink.isHighLighted}
              onChange={() => handleLinkHihlight()}
            />
            <p className="ml-1 text-sm font-medium">Highlight</p>
          </div>
          <div className="mt-5">
            <h3 className="text-sm font-medium">{singlelink.placeholder}</h3>
            <input
              type={`${
                singlelink.placeholder.includes("Number") ? "number" : "text"
              }`}
              placeholder={singlelink?.name}
              className="mt-2 outline-none border-none w-[500px] h-[50px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
              onChange={(e) =>
                settheLink({
                  ...theLink,
                  value: e.target.value,
                  title: singlelink.title,
                })
              }
              value={theLink.value}
            />
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-medium">Link Title*</h3>
            <input
              type="text"
              placeholder={singlelink.name}
              className="mt-2 outline-none border-none w-[500px] h-[50px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
              onChange={(e) => {
                settheLink({ ...theLink, name: e.target.value }),
                  dispatch(changeLinkName(e.target.value));
              }}
              value={theLink.name}
            />
          </div>
          {theLink.isHighLighted && (
            <div className="mt-6">
              <h3 className="text-sm font-medium">Description</h3>
              <input
                type="text"
                placeholder="description"
                className="mt-2 outline-none border-none w-[500px] h-[50px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
                onChange={(e) => {
                  settheLink({ ...theLink, description: e.target.value }),
                    dispatch(setLinkDescription(e.target.value));
                }}
                value={theLink.description}
              />
            </div>
          )}
          <div className="w-[50%] h-[70px]  absolute bottom- flex justify-center mt-2">
            <div className="flex justify-between items-center w-[250px]">
              <div
                className="h-[40px] w-[100px] border rounded-3xl mr-2 flex items-center justify-center cursor-pointer bg-white"
                onClick={() => {
                  dispatch(openLinkModal()),
                    dispatch(removeLink()),
                    dispatch(setLinkHighlight(false)),
                    dispatch(setLinkDescription(""));
                }}
              >
                <p className="text-sm font-medium ml-[3px] ">Cancel</p>
              </div>
              <div
                className="h-[40px] w-[120px] border rounded-3xl ml-2   flex items-center justify-center cursor-pointer"
                style={
                  theLink.value && theLink.name
                    ? { backgroundColor: "#0b567f", color: "white" }
                    : { backgroundColor: "#f7f7f7", color: "#a6a3af" }
                }
                onClick={() => addData(singlelink.placeholder)}
              >
                <p className="text-sm font-medium ml-[3px] ">Add</p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="w-[35%] h-[100%] border-l relative "> */}
        <div className="border-l w-[35%]  flex justify-center h-[100%] items-center overflow-y-scroll scrollbar-hide ">
          <Mobile user={user} link={link} />
        </div>
        {/* </div> */}
      </div>
      {/* <ToastContainer position="top-center" autoClose={2000} /> */}
    </>
  );
};

export default Linkeditmodal;
