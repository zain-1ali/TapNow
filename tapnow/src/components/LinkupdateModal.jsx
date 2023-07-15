import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Mobilecontainer from "./Editprofilecomponents/Mobilecontainer";
import Mobile from "./Editprofilecomponents/Mobile";
import { MdArrowBackIosNew } from "react-icons/md";
import { Switch } from "@mui/material";
import { update, ref, remove, set } from "firebase/database";

import {
  openLinkModal,
  openLinkEditModal,
  openLinkUpdateModal,
  openModal,
  closeAllModal,
} from "../Redux/Modalslice";
import { addLink, changeLinkName, removeLink } from "../Redux/Singlelinkslice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { db } from "../Firebase";
import { AiTwotoneDelete } from "react-icons/ai";
import { setLinkDescription, setLinkHighlight } from "../Redux/UserinfoSlice";

const LinkupdateModal = ({ user, link }) => {
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

  // ----------------------------------------------------Finding link to update---------------------------------------------

  let linkToUpdate = link?.filter((elm) => {
    return singlelink.title === elm?.title;
  });

  useEffect(() => {
    if (linkToUpdate[0]) {
      settheLink({
        isHide: linkToUpdate[0]?.isHide,
        isHighLighted: linkToUpdate[0]?.isHighLighted,
        name: linkToUpdate[0]?.name,
        title: linkToUpdate[0]?.title,
        value: linkToUpdate[0]?.value,
        description: linkToUpdate[0]?.description,
      });
    }
    console.log(linkToUpdate);
  }, [linkToUpdate[0]]);

  console.log(theLink.name);

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
      let toUpdate = link.filter((elm) => {
        return theLink.title != elm.title;
      });

      if (
        title.includes("Link") ||
        title.includes("link") ||
        title.includes("Url")
      ) {
        if (isURL(theLink.value)) {
          set(ref(db, `User/${user?.id}/links/`), [...toUpdate, theLink]).then(
            () => {
              toast.success("Link updated successfuly");

              settheLink({
                isHide: false,
                isHighLighted: false,
                name: singlelink.name,
                title: "",
                value: "",
                description: "",
              });

              dispatch(openLinkModal()),
              dispatch(removeLink());
            }
          );
        } else {
          toast.error("Invalid link or url");
        }
      } else {
        set(ref(db, `User/${user?.id}/links/`), [...toUpdate, theLink]).then(
          () => {
            toast.success("Link updated successfuly");
            settheLink({
              isHide: false,
              isHighLighted: false,
              name: singlelink.name,
              title: "",
              value: "",
              description: "",
            });
            dispatch(openLinkModal()),
            dispatch(removeLink());
          }
        );
      }
    }
  };

  // ----------------------------------------------------Delete link to database---------------------------------------------

  const handleDelete = () => {
    let toUpdate = link?.filter((elm) => {
      return elm.title != singlelink.title;
    });

    if (toUpdate) {
      set(ref(db, `User/${user?.id}/links/`), [...toUpdate]).then(() => {
        toast.success("Link deleted successfuly");
      });
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
              placeholder="Phone number"
              className="mt-2 outline-none border-none w-[500px] h-[50px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
              onChange={(e) =>
                settheLink({ ...theLink, value: e.target.value })
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
              // ,dispatch(changeLinkName(e.target.value))
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
                // ,dispatch(setLinkDescription(e.target.value))
                value={theLink.description}
              />
            </div>
          )}
          <div className="w-[55%] h-[70px]  absolute bottom- flex justify-between items-center mt-5">
            <div
              className=" flex h-[40px] w-[100px] justify-center items-center cursor-pointer rounded-3xl hover:bg-[#f7f7f7]"
              onClick={() => {
                handleDelete(),
                  dispatch(openLinkModal()),
                  dispatch(removeLink());
              }}
            >
              <AiTwotoneDelete className="text-red-600 text-lg mr-[1px]" />
              <h1 class="text-red-600  font-medium ml-[1px]">Remove</h1>
            </div>

            <div className="flex justify-between items-center w-[250px]">
              <div
                className="h-[40px] w-[100px] border rounded-3xl mr-2 flex items-center justify-center cursor-pointer bg-white"
                onClick={() => {
                  dispatch(openLinkModal()), dispatch(removeLink());
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
                onClick={() => 
                  addData(singlelink.placeholder)
                }
           
              >
                <p className="text-sm font-medium ml-[3px] ">Update</p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="w-[35%] h-[100%] border-l relative "> */}
        <div className="w-[35%] border-l flex justify-center h-[100%] items-center overflow-y-scroll scrollbar-hide pt-10">
          <Mobile user={user} link={link} />
        </div>
        {/* </div> */}
      </div>
      {/* <ToastContainer position="top-center" autoClose={2000} /> */}
    </>
  );
};

export default LinkupdateModal;
