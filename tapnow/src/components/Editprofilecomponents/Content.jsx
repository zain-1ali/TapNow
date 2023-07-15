import React, { useEffect, useState } from "react";
import { MdAdd, MdDragIndicator } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import Switch from "@mui/material/Switch";
import { RiAddFill } from "react-icons/ri";
import { returnIcons } from "../../assets/ReturnSocialIcons";
import { ref, set, update } from "firebase/database";
import { db } from "../../Firebase";
import { useSelector, useDispatch } from "react-redux";
import {
  openLinkModal,
  openLinkEditModal,
  openLinkUpdateModal,
  openModal,
  closeAllModal,
} from "../../Redux/Modalslice";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import LinksModal from "../LinksModal";
import { Addlinks } from "../../Redux/LinksSlice";

const Content = ({ user, link }) => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let allLinks = useSelector((state) => state.LinkHandeler.allLinks);

  // ---------------------------------------Handle to change direct mode----------------------------------

  let handleChangeDirect = () => {
    // e.preventDefault()
    if (user?.directMode) {
      update(ref(db, `User/${user?.id}`), {
        directMode: false,
        direct: { name: "", value: "", title: "" },
      }).then(() => {
        // navigate('/profileedit')
      });
    } else {
      update(ref(db, `User/${user?.id}`), {
        directMode: true,
        direct: {
          name: link[0]?.name,
          value: link[0]?.value,
          title: link[0]?.title,
        },
      }).then(() => {
        // navigate('/profileedit')
      });
    }
  };

  // -----------------------------------------Handle to change Lead mode------------------------------------------

  let handleChangeLead = () => {
    return update(ref(db, `User/${user?.id}`), { leadMode: !user?.leadMode });
  };

  // Handle to hide or show link

  let handleHidelLink = (title, value) => {
    // const objectToUpdate = link?.find(obj => obj?.title === title);
    // if (objectToUpdate) {
    //   Update the value of the desired property
    //   objectToUpdate.isHide = !value;

    //   Update the array in the Firebase Realtime Database
    //   set(ref(db, `User/${user?.id}/links/`), [...link]);

    // }

    // Find the index of the object with the given ID
    const objectIndex = link?.findIndex((obj) => obj.title === title);

    // Check if the object exists
    if (objectIndex !== -1) {
      // Create a copy of the object
      const updatedObject = { ...link[objectIndex] };

      // Update the value of the desired property
      updatedObject.isHide = !value;

      // Create a new array with the updated object
      const updatedArray = [...link];
      updatedArray[objectIndex] = updatedObject;
      set(ref(db, `User/${user?.id}/links/`), [...updatedArray]);
    }
  };

  // Add to direct

  let addtoDirect = (name, title, value) => {
    update(ref(db, `User/${user?.id}/`), {
      direct: { name: name, title: title, value: value },
    });
  };

  console.log(user);

  // ------------------------------------------------Dragable functonality------------------------------------------

  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(link);
    dispatch(Addlinks(link));
  }, [link]);
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, movedItem);
    // dispatch(Addlinks(updatedItems))
    setItems(updatedItems);

    // Convert array of object into object of object
    // const objectOfObjects = {};

    // updatedItems.forEach((obj,index)  => {
    //   const { title, ...rest } = obj;
    //   objectOfObjects[title] = {title,...rest,index};
    // });

    // updating at firebase

    set(ref(db, `User/${user?.id}/links/`), [...updatedItems]).then(() => {
      console.log(objectOfObjects);
    });
  };

  return (
    <>
      <div class="w-[73%] h-[100%] 2xl:h-[740px] desktop:h-[1100px]">
        {user?.id ? (
          <>
            <div class="w-[100%] h-[15%]  flex items-center justify-around shadow-sm">
              <div class="h-[50%] w-[44%] rounded-3xl flex border p-2 justify-around items-center desktop:rounded-full">
                {/* w-[250px] */}
                <div class="flex">
                  <p class="text-sm font-medium desktop:text-2xl">Lead Mode</p>
                  <Switch
                    checked={user?.leadMode}
                    size="small"
                    onChange={() => handleChangeLead()}
                    // color="#0b567f"
                  />
                </div>
                <div class="flex ">
                  <p class="text-sm font-medium desktop:text-2xl">Direct</p>
                  <Switch
                    checked={user?.directMode}
                    size="small"
                    onChange={() => handleChangeDirect()}
                  />
                </div>
              </div>
              <div
                class="h-[50%] w-[42%] rounded-3xl flex border bg-[#0b567f] text-white p-2 items-center cursor-pointer justify-center desktop:rounded-full"
                onClick={() => dispatch(openModal())}
              >
                <RiAddFill className="text-white text-2xl" />
                <p class="text-sm ml-1 font-medium desktop:text-3xl ">
                  Add Links and Contact
                </p>
              </div>
            </div>
            {link[0] ? (
              <div className="w-[100%] h-[76%] p-5  overflow-y-scroll ">
                {user?.directMode ? (
                  <>
                    <div className="w-[100%] h-[16%] shadow-md rounded-lg bg-[#fafafa] mt-3 flex items-center p-3 justify-between ">
                      <div className="flex items-center w-[85%]  cursor-pointer">
                        <img
                          src={returnIcons(user?.direct?.title)}
                          alt="social"
                          className="h-[36px] w-[36px] ml-2"
                        />
                        <p className="text-sm font-medium ml-3">
                          {user?.direct.name}
                        </p>
                      </div>
                    </div>

                    {link?.map((elm) => {
                      return (
                        <>
                          <div
                            class="w-[100%] h-[16%] shadow-sm rounded-lg bg-white mt-3 flex items-center p-3 justify-between "
                            // style="display: none;"
                            style={
                              elm?.title === user?.direct?.title
                                ? { display: "none" }
                                : null
                            }
                          >
                            <div className="flex items-center w-[85%]  cursor-pointer opacity-[30%]">
                              <RiAddFill className="text-white text-2xl" />

                              <img
                                src={returnIcons(elm?.title)}
                                alt="social"
                                className="h-[36px] w-[36px] ml-2"
                              />
                              <p className="text-sm font-medium ml-3">
                                {elm?.name}
                              </p>
                            </div>
                            <div
                              className="w-[110px] h-[30px] border border-gray-500 rounded-full flex justify-center items-center text-xs cursor-pointer text-gray-500 hover:bg-[#fafafa] font-medium"
                              onClick={() =>
                                addtoDirect(elm?.name, elm?.title, elm?.value)
                              }
                            >
                              Make direct
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="droppable">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {/* allLinks */}
                          {items?.map((elm, index) => (
                            <Draggable
                              key={elm.title}
                              draggableId={elm.title}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                >
                                  <>
                                    <div class="w-[100%] h-[65px] shadow-md rounded-lg bg-[#fafafa] mt-3 flex items-center p-3 justify-between ">
                                      <div class="flex items-center w-[90%]">
                                        <MdDragIndicator className="text-[#82828290]" />
                                        <img
                                          src={returnIcons(elm?.title)}
                                          alt="social"
                                          class="h-[36px] w-[36px] ml-2"
                                        />
                                        <p class="text-sm font-medium ml-3">
                                          {elm?.name}
                                        </p>
                                      </div>
                                      <div class="w-[15%]">
                                        <Switch
                                          checked={!elm?.isHide}
                                          onChange={() =>
                                            handleHidelLink(
                                              elm?.title,
                                              elm?.isHide
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  </>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>

                  // link?.map((elm) => {
                  //   return (
                  //     <>
                  //       <div class="w-[100%] h-[65px] shadow-md rounded-lg bg-[#fafafa] mt-3 flex items-center p-3 justify-between ">
                  //         <div class="flex items-center w-[90%]  cursor-pointer">
                  //           <MdDragIndicator className="text-[#82828290]" />
                  //           <img
                  //             src={returnIcons(elm?.title)}

                  //             alt="social"
                  //             class="h-[36px] w-[36px] ml-2"
                  //           />
                  //           <p class="text-sm font-medium ml-3">{elm?.name}</p>
                  //         </div>
                  //         <div class="w-[15%]">
                  //           <Switch
                  //             checked={!elm?.isHide}
                  //             onChange={() =>
                  //               handleHidelLink(elm?.title, elm?.isHide)
                  //             }
                  //           />
                  //         </div>
                  //       </div>
                  //     </>
                  //   );
                  // })
                )}
              </div>
            ) : (
              <div className="w-[100%] h-[400px] flex justify-center items-center text-lg font-medium">
                No Links To Show.
                <h2
                  className="ml-1 text-[#0b567f] cursor-pointer text-sm mt-1 underline"
                  onClick={() => dispatch(openModal())}
                >
                  Add Link
                </h2>
              </div>
            )}
          </>
        ) : (
          <div className="w-[100%] h-[100%] flex justify-center items-center">
            <CircularProgress />
          </div>
        )}
      </div>
      <LinksModal user={user} link={link} />
    </>
  );
};

export default Content;
