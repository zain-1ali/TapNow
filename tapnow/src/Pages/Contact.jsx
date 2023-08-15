import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { AiOutlineSearch, AiTwotoneDelete } from "react-icons/ai";
import { onValue, ref } from "firebase/database";
import { db } from "../Firebase";
import ContactModal from "../components/ContactModal";
import DownloadExcel from "../components/DownloadExcel";
import { AiFillEye } from "react-icons/ai";
import MobileScreenUpper from "../components/MobileScreenUpper";
import TheDrawer from "../components/Drawer";
import { useMediaQuery } from "react-responsive";

const Contact = () => {
  let userId = localStorage.getItem("tapNowUid");

  let [selectVal, setselectVal] = useState("");
  let [contacts, setcontacts] = useState([]);
  let [filtered, setfiltered] = useState([]);

  let handleChange = () => {};

  // ------------------------------------geting all user data from firebase------------------------
  let [alluser, setalluser] = useState([]);
  let [childs, setChilds] = useState([]);
  useEffect(() => {
    let getingdata = async () => {
      setChilds([]);
      setalluser([]);

      const starCountRef = ref(db, `/User`);
      onValue(starCountRef, async (snapshot) => {
        const data = await snapshot.val();
        //  console.log(data)
        // MediaKeyStatusMap
        setalluser(Object.values(data));

        // updateStarCount(postElement, data);
      });
    };

    getingdata();
  }, []);

  useEffect(() => {
    let thechilds = alluser?.filter((elm) => {
      if (elm?.parentId || elm?.id === userId) {
        return elm?.parentId === userId || elm?.id === userId;
      }
    });
    setChilds(thechilds);
    // setfiltered(thechilds)
  }, [alluser]);
  useEffect(() => {
    // const contactsArray = childs?.map(obj =>obj?.contactRequests && flattenObject(obj?.contactRequests) )
    // setcontacts(contactsArray)
    const contactsArray = childs?.map((elm) => {
      if (elm?.contactRequests) {
        return Object.values(elm?.contactRequests);
      } else {
        return [];
      }
    });
    const flattenedArray = [].concat(...contactsArray);
    setcontacts(flattenedArray);
    setfiltered(flattenedArray);
  }, [childs]);

  console.log(contacts);

  let [contactModal, setcontactModal] = useState(false);
  let [deleteModal, setdeleteModal] = useState(false);
  let [contactDetails, setcontactDetails] = useState({});

  let handlecontactModal = () => {
    setcontactModal(!contactModal);
    setdeleteModal(false);
  };

  let handledeleteCloseModal = () => {
    setdeleteModal(false);
  };

  let handledeleteOpenModal = () => {
    setdeleteModal(true);
    setcontactModal(!contactModal);
  };

  //---------------------------------------------------(search functionality)-----------------------------------------------

  let [search, setsearch] = useState("");

  useEffect(() => {
    const result = contacts?.filter((contact) => {
      return (
        contact?.name.toLowerCase().match(search.toLowerCase()) ||
        contact?.email.toLowerCase().match(search.toLowerCase())
      );
    });

    setfiltered(result);
  }, [search]);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  let [drawer, setDrawer] = useState(false);

  let handleDrawer = () => {
    setDrawer(!drawer);
    // console.log("test");
  };

  let closeDrawer = () => {
    setDrawer(false);
  };

  let sliceText = (text, num) => {
    let shortText = text?.slice(0, num);
    return shortText + "...";
  };

  let thename = "Muhammad Abdullah Ali";

  return (
    <div class="w-[100%] max-h-[100vh] laptop:flex">
      {isDesktopOrLaptop && <Sidebar />}
      {isTabletOrMobile && <MobileScreenUpper handleDrawer={handleDrawer} />}
      <TheDrawer drawer={drawer} handleDrawer={closeDrawer} />
      <div class="laptop:w-[85%] w-[100%] overflow-y-scroll scrollbar-hide">
        <ContactModal
          contactModal={contactModal}
          handlecontactModal={handlecontactModal}
          contactDetails={contactDetails}
          deleteModal={deleteModal}
          handledeleteModal={handledeleteCloseModal}
        />
        <div class=" w-[100%] h-[100px] mt-[35px] flex justify-center">
          <div class="w-[93%] flex justify-between ">
            <h2 class="text-4xl font-[500]">Contacts</h2>
          </div>
        </div>
        <div class="flex w-[100%]  justify-center">
          <div class="w-[94%] flex justify-between ">
            {isDesktopOrLaptop && (
              <div class="w-[420px] h-[120px] rounded-md bg-[#b2d9ee] flex justify-center items-center">
                <div class="w-[90%] h-[85%] ">
                  <div class="w-[100%] flex ">
                    <div>
                      <HiOutlineInformationCircle class="text-xl mt-[2px]" />
                    </div>
                    <p class="ml-[12px] font-[500] text-sm mt-1">
                      Ensure you have enabled contact exchange
                    </p>
                  </div>
                  <p class="ml-[30px] mt-2 text-gray-500 text-sm">
                    These are the contacts you have received if contact exchange
                    is enabled on your profile.
                  </p>
                  <div class=" w-[115px] ml-[30px] cursor-pointer flex justify-between font-[500] text-[#0b567f] mt-1 items-center text-sm">
                    Learn more
                    <div></div>
                  </div>
                </div>
              </div>
            )}
            {/*  */}
            <div class="w-[320px]  relative mr-5">
              {/* <div class="ml-[10px] border h-[40px] rounded-md w-[140px] flex justify-center items-center text-gray-700 hover:bg-gray-100 cursor-pointer absolute right-0 top-[28px] font-[500]">
              Export via CSV
            </div> */}
              <div class="flex w-[320px]  absolute bottom-0">
                <div class="  border h-[42px] rounded-md w-[210px] flex justify-center items-center">
                  <AiOutlineSearch className="text-gray-500 text-lg ml-2" />
                  <input
                    type="text"
                    placeholder="Search..."
                    class="border-none outline-none ml-2 w-[150px] placeholder:text-sm"
                    onChange={(e) => setsearch(e.target.value)}
                    value={search}
                  />
                </div>

                <div class="ml-[10px] border h-[40px] rounded-md w-[140px] flex justify-center items-center text-gray-700 hover:bg-gray-100 cursor-pointer  font-[500]">
                  {/* Export via CSV
                   */}
                  <DownloadExcel data={filtered} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div class="w-[100%] h-[300px] flex flex-col items-center justify-center border">
        <h2 class="text-2xl font-[500]">No results</h2>
        <p class="text-gray-500 mt-3 flex">
          You can activate a lead-generation form on the card profile settings.
          Contacts collected via that form will be stored here.{" "}
          <h2 class="font-[500] text-[#0b567f] cursor-pointer">Learn more.</h2>
        </p>
      </div> */}

        {filtered?.length > 0 ? (
          <>
            <div className="w-[100%] flex justify-around  mt-6">
              <h2 className="laptop:text-sm text-[10px] font-medium text-gray-700">
                Contact
              </h2>
              {isDesktopOrLaptop && (
                <h2 className="laptop:text-sm text-[10px] font-medium text-gray-700">
                  Email
                </h2>
              )}
              <h2 className="laptop:text-sm text-[10px] font-medium text-gray-700">
                Conected with
              </h2>
              {isDesktopOrLaptop && (
                <h2 className="laptop:text-sm text-[10px] font-medium text-gray-700 ">
                  Date
                </h2>
              )}
              <h2 className="laptop:text-sm text-[10px] font-medium text-gray-700 ">
                Actions
              </h2>
            </div>

            <div className="w-[100%] laptop:px-7 px-3 overflow-y-scroll scrollbar-hide flex flex-col items-center h-[355px]">
              {filtered?.map((elm) => {
                return (
                  <>
                    <div className="bg-[#fafafa] w-[100%] h-[70px] rounded-[30px] mt-3 shadow-sm flex justify-around items-center cursor-pointer">
                      <div className="flex items-center w-[15%] ">
                        <img
                          src={
                            elm?.imgUrl
                              ? elm?.imgUrl
                              : "https://placehold.co/35x35"
                          }
                          alt="img"
                          className="laptop:h-[45px] h-[30px] laptop:w-[45px] w-[30px] rounded-full shadow-md laptop:mr-6"
                        />
                        <h2 className="laptop:text-xs text-[10px] font font-medium laptop:ml-0 ml-2">
                          {elm?.name.length <= 9
                            ? elm?.name
                            : sliceText(elm?.name, 8)}
                          {/* Muhammad Abdullah */}
                        </h2>
                      </div>

                      {isDesktopOrLaptop && (
                        <div className="w-[10%] ">
                          <h2 className="laptop:text-sm text-[10px] font font-medium">
                            {elm?.email?.length < 24
                              ? elm?.email
                              : elm?.email?.sliceText(thename, 25)}
                          </h2>
                        </div>
                      )}

                      <div className="flex items-center laptop:justify-normal justify-center laptop:mr-2 laptop:ml-0 ml-10 laptop:w-[15%] w-[35%]">
                        <img
                          src={
                            elm?.connectedWith?.img
                              ? elm?.connectedWith?.img
                              : "https://placehold.co/35x35"
                          }
                          alt="img"
                          className="h-[35px] w-[35px] rounded-full shadow-md laptop:mr-5 mr-2"
                        />
                        <h2 className="laptop:text-xs text-[10px] font font-medium">
                          {/* {elm?.connectedWith?.name} */}
                          {elm?.connectedWith?.name?.length <= 9
                            ? elm?.connectedWith?.name
                            : sliceText(elm?.connectedWith?.name, 8)}
                        </h2>
                      </div>

                      {isDesktopOrLaptop && (
                        <div className="w-[10%] ml-4 ">
                          <h2 className="text-sm font font-medium ">
                            {elm?.date}
                          </h2>
                        </div>
                      )}

                      <div className="flex items-center  ml-5 ">
                        <div
                          className=""
                          onClick={() => {
                            return handledeleteOpenModal();
                          }}
                        >
                          <AiTwotoneDelete className="text-red-600 text-2xl" />
                        </div>

                        <div
                          onClick={() => {
                            handlecontactModal(), setcontactDetails(elm);
                          }}
                          className="ml-5"
                        >
                          <AiFillEye className="text-[#0b567f] text-2xl " />
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        ) : (
          <div class="w-[100%] h-[300px] flex flex-col items-center justify-center ">
            <h2 class="text-2xl font-[500]">No results</h2>
            <p class="text-gray-500 mt-3 flex text-center w-[90%]">
              You can activate a lead-generation form on the card profile
              settings. Contacts collected via that form will be stored here.{" "}
              {/* <h2 class="font-[500] text-[#0b567f] cursor-pointer">
                Learn more.
              </h2> */}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
