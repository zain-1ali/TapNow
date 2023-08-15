import { Box, Modal } from "@mui/material";
import { ref, remove } from "firebase/database";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { db } from "../Firebase";
import { useMediaQuery } from "react-responsive";

const ContactModal = ({
  contactModal,
  handlecontactModal,
  contactDetails,
  deleteModal,
  handledeleteModal,
}) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: deleteModal ? 320 : isTabletOrMobile ? 330 : 390,
    height: deleteModal ? 150 : 480,
    bgcolor: "white",
    // border: '2px solid #000',
    boxShadow: 24,
    border: "none",
    outline: "none",
    borderRadius: "18px",
    // p: "32px",
  };

  // -----------------------------------------------------delete contact------------------------------------------------------

  let deleteContact = () => {
    remove(
      ref(
        db,
        `User/${contactDetails?.connectedWith?.id}/contactRequests/${contactDetails?.id}`
      )
    ).then(() => {
      // handleModal()
      // toast.success('New profile created successfuly')
      handlecontactModal();
      handledeleteModal();
    });
  };

  return (
    <Modal
      open={contactModal}
      onClose={() => {
        handlecontactModal(), handledeleteModal();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style2}>
        <div className="w-[100%] h-[100%]">
          <div className="w-[97%] flex justify-end  mt-[10px]">
            <RxCross2
              className="text-black cursor-pointer text-xl"
              onClick={() => {
                handlecontactModal(), handledeleteModal();
              }}
            />
          </div>

          {deleteModal ? (
            <>
              <div className="w-[100%] flex justify-center mt-3">
                <h2 className="text-lg font-medium">
                  Are you sure to delete this contact ?
                </h2>
              </div>

              <div className="w-[100%] flex justify-center mt-4">
                <div
                  className="h-[40px] w-[100px] bg-[#0b567f] mr-2 rounded-full text-white flex justify-center items-center cursor-pointer"
                  onClick={() => deleteContact()}
                >
                  Yes
                </div>
                <div
                  className="h-[40px] w-[100px] bg-[#0b567f] ml-2 rounded-full text-white flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    handlecontactModal(), handledeleteModal();
                  }}
                >
                  Cancel
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mt-3">
                <img
                  src={
                    contactDetails?.imgUrl
                      ? contactDetails?.imgUrl
                      : "https://placehold.co/80x80"
                  }
                  alt=""
                  className="h-[80px] w-[80px] rounded-full shadow-lg ml-5"
                />
              </div>

              <div className="flex justify-evenly mt-6">
                <div className="w-[40%] overflow-x-hidden">
                  <h2 className="text-sm font-medium text-gray-700">Name</h2>
                  <p className="font-medium laptop:text-base text-sm">
                    {contactDetails?.name}
                  </p>
                </div>

                <div className="w-[40%] ">
                  <h2 className="text-sm font-medium text-gray-700">Email</h2>
                  <p className="font-medium laptop:text-base text-sm">
                    {contactDetails?.email}
                  </p>
                </div>
              </div>

              <div className="flex justify-around mt-6">
                <div className="w-[40%] overflow-x-hidden">
                  <h2 className="text-sm font-medium text-gray-700">
                    Job Title
                  </h2>
                  <p className="font-medium laptop:text-base text-sm">
                    {contactDetails?.job}
                  </p>
                </div>

                <div className="w-[40%] overflow-x-hidden">
                  <h2 className="text-sm font-medium text-gray-700">Company</h2>
                  <p className="font-medium laptop:text-base text-sm">
                    {contactDetails?.company}
                  </p>
                </div>
              </div>

              <div className="flex justify-around mt-6">
                <div className="w-[40%] overflow-x-hidden">
                  <h2 className="text-sm font-medium text-gray-700">Phone</h2>
                  <p className="font-medium laptop:text-base text-sm">
                    {contactDetails?.phone}
                  </p>
                </div>

                <div className="w-[40%] overflow-x-hidden">
                  <h2 className="text-sm font-medium text-gray-700">Date</h2>
                  <p className="font-medium laptop:text-base text-sm">
                    {contactDetails?.date}
                  </p>
                </div>
              </div>

              <div className="w-[100%] mt-6">
                <div className="ml-5">
                  <h2 className="text-sm font-medium text-gray-700">Note</h2>
                  <p className="font-medium text-sm w-[90%]">
                    {contactDetails?.message}
                  </p>
                </div>
              </div>

              {/* <div className='flex justify-around mt-2'>
<div>
<h2 className='text-sm font-medium text-gray-700'>Email</h2>
<p className='font-medium'>{contactDetails?.email}</p>

</div>
    </div> */}
            </>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default ContactModal;
