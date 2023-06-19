import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { AiOutlineSearch } from "react-icons/ai";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {MdOutlineModeEdit} from 'react-icons/md'
import {FaShare} from 'react-icons/fa'
import {GrAdd} from 'react-icons/gr'
import { onValue, ref } from "firebase/database";
import { db } from "../Firebase";
import { useNavigate } from "react-router-dom";
import OptionModal from "../components/CreateNewPrflModal/OptionModal";

const Home = () => {
  let [selectVal, setselectVal] = useState("");
  let handleChange = () => {};

  let navigate=useNavigate()


let userId=localStorage.getItem('tapNowUid')
let [user,setuser]=useState({})
let [alluser,setalluser]=useState([])
let [childs,setChilds]=useState([])

    // --------------------------geting the user data from firebase------------------------

    useEffect(() => {
      let getingdata = async () => {

          const starCountRef = ref(db, `/User/${userId}`);
          onValue(starCountRef, async (snapshot) => {
              const data = await snapshot.val();
              //  console.log(data)
              MediaKeyStatusMap
              setuser(data)

              // updateStarCount(postElement, data);
          });
      }

      getingdata();


  }, [])

  console.log(user)

    // --------------------------geting all user data from firebase------------------------

  useEffect(() => {
    let getingdata = async () => {
      setChilds([])
      setalluser([])

        const starCountRef = ref(db, `/User`);
        onValue(starCountRef, async (snapshot) => {
            const data = await snapshot.val();
            //  console.log(data)
            MediaKeyStatusMap
            setalluser(Object.values(data))

            // updateStarCount(postElement, data);
        });
    }

    getingdata()
    // .then(()=>{
    //  let thechilds=  alluser?.filter((elm)=>{
    //   if(elm?.parentId){
    //    return elm?.parentId===userId

    //   }
    //   })
    //   setChilds(thechilds)
    // });


}, [user])

useEffect(()=>{
  let thechilds=  alluser?.filter((elm)=>{
    if(elm?.parentId){
     return elm?.parentId===userId

    }
    })
    setChilds(thechilds)
  },[alluser]);


// console.log(childs)


let [modal,setModal]=useState(false)

let handleModal=()=>{
  setModal(!modal)
}



// -----------------------------------------hex to rgba for bg color-------------------------------------

let hexToRGBA=(hex)=> {
  // Remove the '#' character if present
  hex = hex?.replace('#', '');
  
  // Convert the hex value to RGB
  const red = parseInt(hex?.substring(0, 2), 16);
  const green = parseInt(hex?.substring(2, 4), 16);
  const blue = parseInt(hex?.substring(4, 6), 16);
  
  // Convert RGB to RGBA with alpha value 0.1
  const rgba = `rgba(${red}, ${green}, ${blue}, 0.1)`;
  
  return rgba;
}

  return (
    <div className="w-[100%] flex min-h-[100vh]">
      <Sidebar />
      <div className="w-[85%]  pb-4">
        <OptionModal modal={modal} handleModal={handleModal} user={user}/>
        <div className=" w-[100%] h-[100px] mt-[35px] flex justify-center">
          <div className="w-[90%] flex justify-between">
            <h2 className="text-4xl font-[500]">My Profiles</h2>
            <div className="h-[50px] w-[280px]  flex justify-between">
              <div className="border h-[45px] w-[180px] flex justify-center items-center rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer">
                Activate products
              </div>
              <div className="border h-[45px] w-[80px] flex justify-center items-center rounded-md bg-[#0b567f] text-white cursor-pointer">
                Shop
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end h-[60px]">
          <div className="flex w-[500px]  justify-center">
            <div className=" ml-[5px] border h-[40px] rounded-md w-[200px] flex justify-center items-center">
              <AiOutlineSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="border-none outline-none ml-2 w-[150px]"
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
        </div>
<div className="w-[100%] flex justify-center">
        <div className="w-[90%]  grid grid-cols-3 gap-x-4 gap-y-4  mt-6">
          <div className="h-[270px] w-[300px] border rounded-lg mt-5 shadow-lg flex flex-col items-center " style={{backgroundColor:hexToRGBA(user?.colorCode)}}>
            <div className="w-[95%] h-[140px]  rounded-md mt-[6px] relative">
              <img
                src={user?.bgImg}
                alt=""
                className="object-cover h-[100px] w-[100%] rounded-md"
              />
              <div className="h-[95px] w-[95px] absolute z-10 top-[30px] left-[90px]">
                <div className="h-[95px] w-[95px] relative">
                  <img
                    src={user?.profileUrl}
                    alt="proflie"
                    className="h-[95px] w-[95px] border-4 border-white rounded-full"
                  />
                  <div className="h-[40px] w-[40px] rounded-full   absolute top-[65px] right-[-2px] ">
                    <img
                      src={user?.logoImg}
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
            <div className="w-[100%] text-center mt-1 text-sm text-gray-400 ">
              {user?.job} at {user?.company}
            </div>
            <div className="w-[100%]  mt-5 flex justify-center">
              <div className="h-[35px] w-[110px] border rounded-2xl mr-2 flex items-center justify-center cursor-pointer " onClick={()=>navigate('/profileedit',{state:{id:userId,name:user?.name,profileUrl:user?.profileUrl}})}>
                <MdOutlineModeEdit className="text-gray-500"/>
                <p className="text-sm font-medium ml-[3px] text-gray-500">
                  {" "}
                  Edit card
                </p>
              </div>
              <div className="h-[35px] w-[110px] border rounded-2xl ml-2 bg-[#0b567f] flex items-center justify-center cursor-pointer">
                <FaShare className="text-white"/>
                <p className="text-sm font-medium ml-[3px] text-white">
                  Share card
                </p>
              </div>
            </div>
          </div>

          { childs?.map((elm)=>{
            return <>
                 <div className="h-[270px] w-[300px] border rounded-lg mt-5 shadow-lg flex flex-col items-center " style={{backgroundColor:hexToRGBA(elm?.colorCode)}}>
            <div className="w-[95%] h-[140px]  rounded-md mt-[6px] relative">
              <img
                src={elm?.bgImg ? elm?.bgImg :"https://placehold.co/285x140"}
                alt=""
                className="object-cover h-[100px] w-[100%] rounded-md"
              />
              <div className="h-[95px] w-[95px] absolute z-10 top-[30px] left-[90px]">
                <div className="h-[95px] w-[95px] relative">
                  <img
                    src={elm?.profileUrl?elm?.profileUrl:"https://placehold.co/95x95"}
                    alt="proflie"
                    className="h-[95px] w-[95px] border-4 border-white rounded-full"
                  />
                  <div className="h-[40px] w-[40px] rounded-full   absolute top-[65px] right-[-2px] ">
                    <img
                      src={elm?.logoImg ? elm?.logoImg :"https://placehold.co/40x40"}
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
            <div className="w-[100%] text-center mt-1 text-sm text-gray-400 ">
              {elm?.job} at {elm?.company}
            </div>
            <div className="w-[100%]  mt-5 flex justify-center">
              <div className="h-[35px] w-[110px] border rounded-2xl mr-2 flex items-center justify-center cursor-pointer " onClick={()=>navigate('/profileedit',{state:{id:elm?.id,name:elm?.name,profileUrl:elm?.profileUrl}})}>
                <MdOutlineModeEdit className="text-gray-500"/>
                <p className="text-sm font-medium ml-[3px] text-gray-500">
                  {" "}
                  Edit card
                </p>
              </div>
              <div className="h-[35px] w-[110px] border rounded-2xl ml-2 bg-[#0b567f] flex items-center justify-center cursor-pointer">
                <FaShare className="text-white"/>
                <p className="text-sm font-medium ml-[3px] text-white">
                  Share card
                </p>
              </div>
            </div>
          </div>
            </>
          })

          }
          <div className="h-[270px] w-[300px] border rounded-lg mt-5 shadow-lg flex flex-col justify-center items-center cursor-pointer" onClick={()=>handleModal()}>
            <div className="h-[65px] w-[65px] rounded-full border flex justify-center items-center bg-gray-300">
             <GrAdd/>
            </div>
            <p className="text-gray-500 mt-2 font-medium">Create New Card</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
