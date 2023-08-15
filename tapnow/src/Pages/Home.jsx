import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import { AiOutlineSearch } from "react-icons/ai";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MdAdminPanelSettings, MdOutlineModeEdit } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { onValue, ref, set } from "firebase/database";
import { db } from "../Firebase";
import { Navigate, useNavigate } from "react-router-dom";
import OptionModal from "../components/CreateNewPrflModal/OptionModal";
import TeamProfileModal from "../components/CreateNewPrflModal/TeamProfileModal";
import { BsFillPeopleFill, BsPersonFill } from "react-icons/bs";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { getData } from "../Redux/Adminslice";
import { useDispatch } from "react-redux";
import ShareCardModal from "../components/ShareCardModal";
import { useMediaQuery } from "react-responsive";
import MobileScreenUpper from "../components/MobileScreenUpper";
import TheDrawer from "../components/Drawer";
// import { Drawer } from "@mui/material";

const Home = () => {
  let dispatch = useDispatch();
  let [selectVal, setselectVal] = useState("A to Z");
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  let handleChange = (event) => {
    setselectVal(event.target.value);
  };

  // useMemo(() => window.location.reload(true), [])

  let navigate = useNavigate();

  let userId = localStorage.getItem("tapNowUid");
  let [user, setuser] = useState({});
  let [alluser, setalluser] = useState([]);
  let [childs, setChilds] = useState([]);
  let [filtered, setfiltered] = useState([]);

  // --------------------------geting the user data from firebase------------------------

  useEffect(() => {
    let getingdata = async () => {
      const starCountRef = ref(db, `/User/${userId}`);
      onValue(starCountRef, async (snapshot) => {
        const data = await snapshot.val();
        //  console.log(data)
        // MediaKeyStatusMap
        setuser(data);
        dispatch(getData(data));
      });
    };

    getingdata();
  }, []);

  console.log(user);

  // --------------------------geting all user data from firebase------------------------

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
    // .then(()=>{
    //  let thechilds=  alluser?.filter((elm)=>{
    //   if(elm?.parentId){
    //    return elm?.parentId===userId

    //   }
    //   })
    //   setChilds(thechilds)
    // });
  }, [user]);

  useEffect(() => {
    let thechilds = alluser?.filter((elm) => {
      if (elm?.parentId || elm?.id === userId) {
        return elm?.parentId === userId || elm?.id === userId;
      }
    });
    setChilds(thechilds);
    // setfiltered(thechilds);
    const sortedData = [...thechilds].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setfiltered(sortedData);
  }, [alluser]);

  // console.log(childs)

  let [modal, setModal] = useState(false);

  let handleModal = () => {
    setModal(!modal);
  };

  // -----------------------------------------hex to rgba for bg color-------------------------------------

  let hexToRGBA = (hex) => {
    // Remove the '#' character if present
    hex = hex?.replace("#", "");

    // Convert the hex value to RGB
    const red = parseInt(hex?.substring(0, 2), 16);
    const green = parseInt(hex?.substring(2, 4), 16);
    const blue = parseInt(hex?.substring(4, 6), 16);

    // Convert RGB to RGBA with alpha value 0.1
    const rgba = `rgba(${red}, ${green}, ${blue}, 0.1)`;

    return rgba;
  };

  let [teamModal, setTeamModal] = useState(false);

  let handleTeamModal = () => {
    setTeamModal(!teamModal);
  };

  //---------------------------------------------------(search functionality)-----------------------------------------------

  let [search, setsearch] = useState("");

  useEffect(() => {
    const result = childs.filter((user) => {
      return user?.name.toLowerCase().match(search.toLowerCase());
    });

    setfiltered(result);
  }, [search]);

  //---------------------------------------------------(For Securing routes)-----------------------------------------------

  //   let currentUser=localStorage.getItem('tapNowUid')

  //   useEffect(()=>{
  // if(!currentUser){
  // <Navigate to={'/'}/>
  // }else{
  // <Navigate to={'/home'}/>

  // }
  //   },[])

  // console.log(Date.now())

  let [url, seturl] = useState("");
  let [shareModal, setshareModal] = useState(false);

  let handleShareModal = (username) => {
    setshareModal(!shareModal);
    seturl(`https://tapnowprofile.link2avicenna.com/${username}`);
  };

  // -------------------------------------------------Sort functionality-------------------------------------------------

  const sortByAscending = () => {
    const sortedData = [...filtered].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setfiltered(sortedData);
  };

  const sortByDescending = () => {
    const sortedData = [...filtered].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    setfiltered(sortedData);
  };

  let returnJobCompany = (job, company) => {
    return `${job} at ${company}`;
  };

  let [drawer, setDrawer] = useState(false);

  let handleDrawer = () => {
    setDrawer(!drawer);
    // console.log("test");
  };

  let closeDrawer = () => {
    setDrawer(false);
  };

  return (
    <div className="w-[100%] laptop:flex max-h-[100vh]">
      {isDesktopOrLaptop && <Sidebar user={user} />}
      {isTabletOrMobile && <MobileScreenUpper handleDrawer={handleDrawer} />}
      <TheDrawer drawer={drawer} handleDrawer={closeDrawer} />
      {user?.id ? (
        <div className="laptop:w-[85%] w-[100%]  pb-4 overflow-y-scroll scrollbar-hide border">
          <ShareCardModal
            shareModal={shareModal}
            handleShareModal={handleShareModal}
            url={url}
          />
          <OptionModal
            modal={modal}
            handleModal={handleModal}
            user={user}
            handleTeamModal={handleTeamModal}
          />
          <TeamProfileModal
            teamModal={teamModal}
            handleTeamModal={handleTeamModal}
          />
          <div className=" w-[100%] laptop:h-[100px] h-[60px] mt-[35px] flex justify-center ">
            <div className="w-[95%] flex justify-between">
              {isDesktopOrLaptop && (
                <h2 className="text-4xl font-[500]">My Profiles</h2>
              )}

              {/* <div className="h-[50px] w-[280px]  flex justify-between">
              <div className="border h-[45px] w-[180px] flex justify-center items-center rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer">
                Activate products
              </div>
              <div className="border h-[45px] w-[80px] flex justify-center items-center rounded-md bg-[#0b567f] text-white cursor-pointer">
                Shop
              </div>
            </div> */}

              <div className="flex laptop:w-[500px] w-[100%]   justify-center">
                <div className=" ml-[5px] border border-[#d3d3d3] h-[40px] rounded-md w-[200px] flex justify-center items-center">
                  <AiOutlineSearch className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="border-none outline-none ml-2 w-[150px]"
                    onChange={(e) => setsearch(e.target.value)}
                    value={search}
                  />
                </div>

                <div className="ml-[10px]">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectVal}
                      label="Sort"
                      style={{ width: "150px", height: "40px" }}
                      onChange={handleChange}
                    >
                      <MenuItem
                        value="A to Z"
                        onClick={() => sortByAscending()}
                      >
                        A to Z
                      </MenuItem>
                      <MenuItem
                        value="Z to A"
                        onClick={() => sortByDescending()}
                      >
                        Z to A
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
          {isTabletOrMobile && (
            <div className="w-[100%]   flex justify-between items-center mt-[15px]">
              <h2 className="text-[26px] font-[500] text-gray-900 ml-[4%]">
                My Profiles
              </h2>

              <div
                className="w-[164px] h-[50px] rounded-full bg-[#0b567f] mr-[4%] flex items-center justify-center text-white text-sm font-400"
                onClick={() => handleModal()}
              >
                <span className="text-2xl mr-1 mt-[2px]">+</span>
                Create New Card
              </div>
            </div>
          )}

          {/* <div className="flex justify-end h-[60px]">
          <div className="flex w-[500px]  justify-center">
            <div className=" ml-[5px] border h-[40px] rounded-md w-[200px] flex justify-center items-center">
              <AiOutlineSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="border-none outline-none ml-2 w-[150px]"
                onChange={(e)=>setsearch(e.target.value)}
                value={search}
              />
            </div>

            <div className="ml-[10px]">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectVal}
                  label="Age"
                  style={{ width: "150px", height: "40px" }}
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div> */}
          <div className="w-[100%] flex justify-center">
            <div
              className="w-[90%]  grid laptop:grid-cols-3 grid-cols-1 laptop:gap-x-4 gap-y-4 "
              style={
                isTabletOrMobile
                  ? {
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }
                  : null
              }
            >
              {/* <div className="h-[270px] w-[300px] border rounded-lg mt-5 shadow-lg flex flex-col items-center " style={{backgroundColor:hexToRGBA(user?.colorCode)}}>
            <div className="w-[95%] h-[140px]  rounded-md mt-[6px] relative ">
              <div className="h-[30px] w-[30px] absolute left-[5px] top-[5px] bg-white  rounded-full flex justify-center items-center">
              <MdAdminPanelSettings className=" text-2xl text-[#0b567f] "/>
              
              </div>
              <img
                src={user?.bgImg ? user?.bgImg :"https://placehold.co/285x140"}
                alt=""
                className="object-cover h-[100px] w-[100%] rounded-md"
              />
              <div className="h-[95px] w-[95px] absolute z-10 top-[30px] left-[90px]">
                <div className="h-[95px] w-[95px] relative">
                  <img
                    src={user?.profileUrl ? user?.profileUrl  :"https://placehold.co/95x95"}
                    alt="proflie"
                    className="h-[95px] w-[95px] border-4 border-white rounded-full"
                  />
                  <div className="h-[40px] w-[40px] rounded-full   absolute top-[65px] right-[-2px] ">
                    <img
                      src={user?.logoImg ? user?.logoImg :"https://placehold.co/95x95"}
                      alt="logo"
                      className="h-[35px] w-[35px] rounded-full object-cover   shadow-md border-2 border-white"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[100%] text-center mt-1 text-xl font-medium">
              {user?.name}
            </div>
            {user?.job && user?.company ?
            <div className="w-[100%] text-center mt-1 text-sm text-gray-400 ">
              {user?.job} at {user?.company}
            </div>
            :

            <div className="w-[100%] text-center mt-1 text-sm text-gray-400 ">
              {user?.job}
            </div>

}
            <div className="w-[100%]  mt-[13px] flex justify-center">
              <div className="h-[35px] w-[110px] border border-gray-500 rounded-2xl mr-2 flex items-center justify-center cursor-pointer " onClick={()=>navigate('/profileedit',{state:{id:userId,name:user?.name,profileUrl:user?.profileUrl}})}>
                <MdOutlineModeEdit className="text-gray-500"/>
                <p className="text-sm font-medium ml-[3px] text-gray-500">
                 
                  Edit card
                </p>
              </div>
              <div className="h-[35px] w-[110px] border  rounded-2xl ml-2 bg-[#0b567f] flex items-center justify-center cursor-pointer">
                <FaShare className="text-white"/>
                <p className="text-sm font-medium ml-[3px] text-white">
                  Share card
                </p>
              </div>
            </div>
          </div> */}

              {filtered?.map((elm) => {
                return (
                  <>
                    <div
                      className="h-[270px] w-[300px] border rounded-lg mt-5 shadow-lg flex flex-col items-center "
                      style={{ backgroundColor: hexToRGBA(elm?.colorCode) }}
                    >
                      <div className="w-[95%] h-[140px]  rounded-md mt-[6px] relative">
                        <div className="h-[30px] w-[30px] absolute left-[5px] top-[5px] bg-white  rounded-full flex justify-center items-center">
                          {elm?.isSelf ? (
                            <BsPersonFill className=" text-xl text-[#0b567f] " />
                          ) : elm?.id === userId ? (
                            <MdAdminPanelSettings className=" text-2xl text-[#0b567f] " />
                          ) : (
                            <BsFillPeopleFill className=" text-xl text-[#0b567f] " />
                          )}
                        </div>
                        <img
                          src={
                            elm?.bgImg
                              ? elm?.bgImg
                              : "https://placehold.co/285x140"
                          }
                          alt=""
                          className="object-cover h-[100px] w-[100%] rounded-md"
                        />
                        <div className="h-[95px] w-[95px] absolute z-10 top-[30px] left-[90px]">
                          <div className="h-[95px] w-[95px] relative">
                            <img
                              src={
                                elm?.profileUrl
                                  ? elm?.profileUrl
                                  : "https://placehold.co/95x95"
                              }
                              alt="proflie"
                              className="h-[95px] w-[95px] border-4 border-white rounded-full"
                            />
                            <div className="h-[40px] w-[40px] rounded-full   absolute top-[65px] right-[-2px] ">
                              <img
                                src={
                                  elm?.logoImg
                                    ? elm?.logoImg
                                    : "https://placehold.co/40x40"
                                }
                                alt="logo"
                                className="h-[35px] w-[35px] rounded-full object-cover   shadow-md border-2 border-white"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-[100%] text-center mt-1 text-xl font-medium">
                        {elm?.name}
                      </div>
                      {elm?.job && elm?.company ? (
                        <div className="w-[100%] text-center mt-1 text-xs font-[300] text-gray-400">
                          {returnJobCompany(elm?.job, elm?.company).length <= 52
                            ? returnJobCompany(elm?.job, elm?.company)
                            : returnJobCompany(
                                elm?.job,
                                elm?.company
                              ).substring(0, 51) + "..."}
                        </div>
                      ) : (
                        <div className="w-[100%] text-center mt-1 text-xs text-gray-400 ">
                          {elm?.job}
                        </div>
                      )}

                      {/* {!elm?.job || !elm?.company ?

          } */}
                      <div
                        className="w-[100%]  mt-[13px] flex justify-center"
                        style={
                          elm?.job || elm?.company
                            ? { marginTop: "13px" }
                            : { marginTop: "28px" }
                        }
                      >
                        <div
                          className="h-[35px] w-[110px] border border-gray-500 rounded-2xl mr-2 flex items-center justify-center cursor-pointer "
                          onClick={() =>
                            navigate("/profileedit", {
                              state: {
                                id: elm?.id,
                                name: elm?.name,
                                profileUrl: elm?.profileUrl,
                              },
                            })
                          }
                        >
                          <MdOutlineModeEdit className="text-gray-500" />
                          <p className="text-xs font-medium ml-[3px] text-gray-500">
                            Edit card
                          </p>
                        </div>
                        <div
                          className="h-[35px] w-[110px] border rounded-2xl ml-2 bg-[#0b567f] flex items-center justify-center cursor-pointer"
                          onClick={() => handleShareModal(elm?.userName)}
                        >
                          <FaShare className="text-white" />
                          <p className="text-xs font-medium ml-[3px] text-white">
                            Share card
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
              <div
                className="h-[270px] w-[300px] border rounded-lg mt-5 shadow-lg flex flex-col justify-center items-center cursor-pointer"
                onClick={() => handleModal()}
              >
                <div className="h-[65px] w-[65px] rounded-full border flex justify-center items-center bg-gray-300">
                  <GrAdd />
                </div>
                <p className="text-gray-500 mt-2 font-medium">
                  Create New Card
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="laptop:w-[85%] w-[100%] h-[100vh]  flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Home;
