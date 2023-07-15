import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { TiArrowForward } from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";
import Editcard from "../components/Editprofilecomponents/Editcard";
import { useLocation, useNavigate } from "react-router-dom";
import ShareCardModal from "../components/ShareCardModal";

const Profileedit = () => {
  let location = useLocation();
  let userID = location.state.id;
  let profileimg = location.state.profileUrl;
  let userName = location.state.name;
  let navigate = useNavigate();

  let [url, seturl] = useState("");
  let [shareModal, setshareModal] = useState(false);

  let handleShareModal = (username) => {
    setshareModal(!shareModal);
    seturl(
      `https://64ad38d81eab7a15ab5ad2b5--jolly-brigadeiros-9ab0fa.netlify.app/${username}`
    );
  };

  return (
    <div className="w-[100%] flex ">
      <Sidebar />
      <div className="w-[85%] bg-[#fafafa] p-7">
        <ShareCardModal
          shareModal={shareModal}
          handleShareModal={handleShareModal}
          url={url}
        />
        <div className="w-[100%] flex justify-between">
          <div className=" flex  w-[390px] items-center">
            <MdOutlineKeyboardArrowLeft
              className="text-[40px] cursor-pointer"
              onClick={() => navigate("/home")}
            />
            <div className="flex items-center  w-[300px] text-[#000000de] ml-1">
              <img
                src={profileimg ? profileimg : "https://placehold.co/50x50"}
                alt=""
                className="h-[50px] w-[50px] object-cover rounded-full shadow-md"
              />
              <h2 className="text-xl font-medium text-[#000000de] ml-4">
                {userName}
              </h2>
            </div>
          </div>
          <div className="flex justify-center items-center w-[280px]">
            <div
              className="h-[40px] w-[170px] border rounded-3xl  bg-[#0b567f] flex items-center justify-center cursor-pointer"
              onClick={() => handleShareModal(userID)}
            >
              <TiArrowForward className="text-white text-[25px]" />
              <p className="text-sm font-medium ml-[3px] text-white">
                Share Your Card
              </p>
            </div>
            {/* <div className="h-[40px] w-[70px] border rounded-3xl mr-2 flex items-center justify-center cursor-pointer bg-white">
              <BsThreeDots/>
            </div> */}
          </div>
        </div>
        <Editcard userID={userID} />
      </div>
    </div>
  );
};

export default Profileedit;
