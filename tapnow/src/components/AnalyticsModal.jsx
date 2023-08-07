import React from "react";
import { Box, Modal } from "@mui/material";
import { ref, remove } from "firebase/database";
// import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { db } from "../Firebase";
import { returnIcons } from "../assets/ReturnSocialIcons";
import { useMediaQuery } from "react-responsive";

const AnalyticsModal = ({ modal, handleModal, userdata }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isTabletOrMobile ? 330 : 400,
    height: 480,
    bgcolor: "#f5f6fa",
    // border: '2px solid #000',
    boxShadow: 24,
    border: "none",
    outline: "none",
    borderRadius: "18px",

    // p: "32px",
  };

  // -----------------------------------------------------delete contact------------------------------------------------------

  return (
    <Modal
      open={modal}
      onClose={() => handleModal()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style2}>
        <div className="w-[100%] h-[100%] ">
          <div className="w-[97%] flex justify-end  mt-[10px]">
            <RxCross2
              className="text-black cursor-pointer text-xl"
              onClick={() => handleModal()}
            />
          </div>

          <div className="w-[100%] flex flex-col items-center">
            <div className="w-[90%] h-[130px] bg-white rounded-lg shadow-md mt-2 flex">
              <div className="w-[50%] h-[100%] flex flex-col items-center justify-center">
                <h2 className="font-medium">Total Views</h2>
                <p>
                  {userdata?.Analytics?.totalClicks
                    ? userdata?.Analytics?.totalClicks
                    : 0}
                </p>
              </div>

              <div className="w-[50%] h-[100%] flex  items-center justify-center">
                <img
                  src={
                    userdata?.profileUrl
                      ? userdata?.profileUrl
                      : "https://placehold.co/90x90"
                  }
                  alt="profile"
                  className="h-[90px] w-[90px] rounded-full shadow-md"
                />
              </div>
            </div>

            <div className="w-[90%]  mt-3 flex justify-between ">
              <div className="w-[47%] h-[110px] bg-[white] rounded-lg shadow-md flex flex-col justify-center items-center">
                <div className="flex w-[85%] justify-between mb-2">
                  <h2 className="text-sm font-medium">Link Clicks</h2>
                  <p>
                    {userdata?.Analytics?.linksEngCrntWk
                      ? userdata?.Analytics?.linksEngCrntWk
                      : 0}
                  </p>
                </div>

                <div className="flex w-[85%] justify-between mt-2">
                  <h2 className="text-sm font-medium">Since last week</h2>
                  <p>
                    {userdata?.Analytics?.linksEngPstWk
                      ? userdata?.Analytics?.linksEngPstWk
                      : 0}
                  </p>
                </div>
              </div>

              <div className="w-[47%] h-[110px] bg-[white] rounded-lg shadow-md flex flex-col justify-center items-center">
                <div className="flex w-[85%] justify-between mb-2">
                  <h2 className="text-[13px] font-medium">Contact downloads</h2>
                  <p>
                    {userdata?.Analytics?.tContactsMeCrntWk
                      ? userdata?.Analytics?.tContactsMeCrntWk
                      : 0}
                  </p>
                </div>

                <div className="flex w-[85%] justify-between mt-2">
                  <h2 className="text-sm font-medium">Since last week</h2>
                  <p>
                    {userdata?.Analytics?.tContactsMePstWk
                      ? userdata?.Analytics?.tContactsMePstWk
                      : 0}
                  </p>
                </div>
              </div>
            </div>
            {userdata?.Analytics?.links ? (
              <div className="w-[90%] h-[160px] mt-3 p-2 overflow-y-scroll scrollbar-hide">
                {Object.values(userdata?.Analytics?.links)?.map((elm) => {
                  return (
                    <div className="w-[100%] h-[50px] bg-white rounded-md shadow-md mt-2 p-3 flex justify-between">
                      <div className="w-[100%] flex justify-between items-center ">
                        <div className="flex">
                          <img
                            src={returnIcons(elm?.name)}
                            alt=""
                            className="h-[30px] w-[30px]"
                          />
                          <h2 className="text-sm font-medium ml-2">
                            {elm?.name}
                          </h2>
                        </div>
                      </div>

                      <div>{elm?.totalClicks}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="w-[100%] flex justify-center mt-4">
                No Links to Show
              </div>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default AnalyticsModal;

// const AnalyticsModal = () => {
//   return (
//     <></>
//   )
// }

// export default
