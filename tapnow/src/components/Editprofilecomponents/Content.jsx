import React, { useEffect, useState } from "react";
import { MdAdd, MdDragIndicator } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import Switch from "@mui/material/Switch";
import { RiAddFill } from "react-icons/ri";
import { returnIcons } from "../../assets/ReturnSocialIcons";
import { ref, update } from "firebase/database";
import { db } from "../../Firebase";
import { useSelector,useDispatch } from "react-redux";
import { openLinkModal,openLinkEditModal,openLinkUpdateModal,openModal,closeAllModal } from '../../Redux/Modalslice'
import CircularProgress from '@mui/material/CircularProgress';


import LinksModal from "../LinksModal";

const Content = ({ user, link }) => {


let dispatch =useDispatch()
  // ---------------------------------------Handle to change direct mode----------------------------------

  let handleChangeDirect = () => {
    if (user?.directMode) {
      update(ref(db, `User/${user?.id}`), {
        directMode: false,
        direct: { name: "", value: "" },
      });
    } else {
      update(ref(db, `User/${user?.id}`), {
        directMode: true,
        direct: { name: link[0]?.name, value: link[0]?.value },
      });
    }
  };

  // -----------------------------------------Handle to change Lead mode------------------------------------------

  let handleChangeLead = () => {
    update(ref(db, `User/${user?.id}`), { LeadMode: !user?.LeadMode });
  };

  // Handle to hide or show link

  let handleHidelLink = (title, value) => {
    update(ref(db, `User/${user?.id}/links/${title}`), { isHide: !value });
  };

   // Add to direct

   let addtoDirect = (title, value) => {
    update(ref(db, `User/${user?.id}/`), { direct: { name: title, value: value } });
  };

  console.log(user);
  return (
    <>

      <div class="w-[530px] h-[100%] ">
        {
          user?.id ?
       <>
        <div class="w-[100%] h-[80px]  flex items-center justify-around shadow-sm">
          <div class="h-[40px] w-[250px] rounded-3xl flex border p-2 justify-around">
            <div class="flex">
              <p class="text-sm font-medium">Lead Mode</p>
              <Switch
                checked={user?.LeadMode}
                size="small"
                onChange={() => handleChangeLead()}
              />
            </div>
            <div class="flex ">
              <p class="text-sm font-medium">Direct</p>
              <Switch
                checked={user?.directMode}
                size="small"
                onChange={() => handleChangeDirect()}
              />
            </div>
          </div>
          <div class="h-[40px] w-[42%] rounded-3xl flex border bg-black text-white p-2 items-center cursor-pointer justify-center" onClick={()=>dispatch(openModal())}>
            <RiAddFill className="text-white text-2xl" />
            <p class="text-sm ml-1 font-medium ">Add Links and Contact</p>
          </div>
        </div>
        {
          link[0] ?
        <div className="w-[100%] h-[400px] p-5  overflow-y-scroll ">
          {user?.directMode ? (
            <>
              <div className="w-[100%] h-[65px] shadow-md rounded-lg bg-[#fafafa] mt-3 flex items-center p-3 justify-between ">
                <div className="flex items-center w-[85%]  cursor-pointer">
                  <img
                    src={returnIcons(user?.direct.name)}
                    alt="social"
                    className="h-[36px] w-[36px] ml-2"
                  />
                  <p className="text-sm font-medium ml-3">
                    {user?.direct.name}
                  </p>
                </div>
              </div>

              { 
              
              link?.map((elm) => {
                return (
                  <>
                    <div
                      class="w-[100%] h-[65px] shadow-sm rounded-lg bg-white mt-3 flex items-center p-3 justify-between "
                      // style="display: none;"
                      style={elm?.title===user?.direct.name ? {display:'none'} :null}
                    >
                      <div className="flex items-center w-[85%]  cursor-pointer opacity-[30%]">
            <RiAddFill className="text-white text-2xl" />
                        
                        <img
                          src={returnIcons(elm?.title)}
                          alt="social"
                          className="h-[36px] w-[36px] ml-2"
                        />
                        <p className="text-sm font-medium ml-3">{elm?.name}</p>
                      </div>
                      <div className="w-[110px] h-[30px] border border-gray-500 rounded-full flex justify-center items-center text-xs cursor-pointer text-gray-500 hover:bg-[#fafafa] font-medium" onClick={()=>addtoDirect(elm?.title,elm?.value)}>
                        Make direct
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            link?.map((elm) => {
              return (
                <>
                  <div class="w-[100%] h-[65px] shadow-md rounded-lg bg-[#fafafa] mt-3 flex items-center p-3 justify-between ">
                    <div class="flex items-center w-[90%]  cursor-pointer">
                      <MdDragIndicator className="text-[#82828290]" />
                      <img
                        src={returnIcons(elm?.title)}
                        alt="social"
                        class="h-[36px] w-[36px] ml-2"
                      />
                      <p class="text-sm font-medium ml-3">{elm?.name}</p>
                    </div>
                    <div class="w-[15%]">
                      <Switch
                        checked={!elm?.isHide}
                        onChange={() =>
                          handleHidelLink(elm?.title, elm?.isHide)
                        }
                      />
                    </div>
                  </div>
                </>
              );
            })
          )}
        </div>
        :
        <div className="w-[100%] h-[400px] flex justify-center items-center text-lg font-medium">
No Links To Show
        </div>
        }
        </>
        :
        <div className="w-[100%] h-[100%] flex justify-center items-center">
          <CircularProgress/>
        </div>
        }
       
      </div>
      <LinksModal user={user} link={link} />
    </>
  );
};

export default Content;
