import { Box, Modal } from "@mui/material";
import React from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

const ProfileCompleteModal = ({
  prflCmpltModal,
  handlePrflCmpltModal,
  user,
  link,
}) => {
  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    height: 525,
    bgcolor: "white",
    // border: '2px solid #000',
    boxShadow: 24,
    border: "none",
    outline: "none",
    borderRadius: "18px",
    // p: "32px",
  };
  return (
    <div>
      <Modal
        open={prflCmpltModal}
        onClose={() => handlePrflCmpltModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <div className="w-[100%] flex flex-col items-center">
            <div className="w-[94%] flex justify-end  mt-[6px]">
              <RxCross2
                className="text-black cursor-pointer text-xl"
                onClick={() => handlePrflCmpltModal()}
              />
            </div>
            <h2 className=" font-medium text-[20px]">Complete your tasks</h2>
            <div className="w-[90%] h-[75px] rounded-lg shadow-md bg-[#fafafa] mt-4 flex flex-col items-center justify-center relative">
              <h2 className="text-sm font-medium">Add Profile Picture</h2>
              <p className="text-sm">
                You can change profile picture in About section
              </p>
              {user?.profileUrl && (
                <BsCheck2Circle className="absolute text-xl text-green-500 top-[38%] right-3" />
              )}
            </div>
            <div className="w-[90%] h-[75px] rounded-lg shadow-md bg-[#fafafa] mt-4 flex flex-col items-center justify-center relative">
              <h2 className="text-sm font-medium">Add Cover Picture</h2>
              <p className="text-sm">
                You can change cover picture in About section
              </p>
              {user?.bgImg && (
                <BsCheck2Circle className="absolute text-xl text-green-500 top-[38%] right-3" />
              )}
            </div>

            <div className="w-[90%] h-[75px] rounded-lg shadow-md bg-[#fafafa] mt-4 flex flex-col items-center justify-center relative">
              <h2 className="text-sm font-medium">Add Company Logo Picture</h2>
              <p className="text-sm">
                You can change logo picture in About section
              </p>
              {user?.logoImg && (
                <BsCheck2Circle className="absolute text-xl text-green-500 top-[38%] right-3" />
              )}
            </div>
            <div className="w-[90%] h-[75px] rounded-lg shadow-md bg-[#fafafa] mt-4 flex flex-col items-center justify-center relative">
              <h2 className="text-sm font-medium">Add First Social Link</h2>
              <p className="text-sm">You can add links in Content section</p>
              {link && (
                <BsCheck2Circle className="absolute text-xl text-green-500 top-[38%] right-3" />
              )}
            </div>
            <div className="w-[90%] h-[75px] rounded-lg shadow-md bg-[#fafafa] mt-4 flex flex-col items-center justify-center relative">
              <h2 className="text-sm font-medium">Acitivate Your Device</h2>
              <p className="text-sm">Download android or ios app</p>
              {/* <BsCheck2Circle className="absolute text-xl text-green-500 top-[38%] right-3" /> */}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileCompleteModal;
