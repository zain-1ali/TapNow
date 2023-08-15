import { Box, Modal } from "@mui/material";
import React, { useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { RxCross2 } from "react-icons/rx";

const LogoutModal = ({ modal, handleModal, logoutFunc }) => {
  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 340,
    height: 160,
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
        open={modal}
        onClose={() => handleModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <div className="h-[100%] w-[100%] flex items-center flex-col ">
            <>
              <div className="w-[100%] flex justify-center mt-12">
                <h2 className="text-[17px] font-medium text-[#0b567f]">
                  Are you sure to logout from this device ?
                </h2>
              </div>

              <div className="w-[100%] flex justify-center mt-4">
                <div
                  className="h-[40px] w-[100px] bg-[#0b567f] mr-2 rounded-full text-white flex justify-center items-center cursor-pointer"
                  onClick={() => logoutFunc()}
                >
                  Sure
                </div>
                <div
                  className="h-[40px] w-[100px] bg-[#0b567f] ml-2 rounded-full text-white flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    handleModal();
                  }}
                >
                  Cancel
                </div>
              </div>
            </>
          </div>
        </Box>
      </Modal>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default LogoutModal;
