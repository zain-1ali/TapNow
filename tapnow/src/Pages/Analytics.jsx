import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {HiOutlineInformationCircle} from 'react-icons/hi'
import {AiOutlineSearch} from 'react-icons/ai'
import {BsGraphUpArrow} from 'react-icons/bs'
import {SlGraph} from 'react-icons/sl'
import { onValue, ref } from "firebase/database";
import { db } from "../Firebase";
import AnalyticsModal from "../components/AnalyticsModal";

const Analytics = () => {



  let userId=localStorage.getItem('tapNowUid')
  let [user,setuser]=useState({})
  let [alluser,setalluser]=useState([])
  let [childs,setChilds]=useState([])
  let [filtered,setfiltered]=useState([])
  
      // --------------------------geting the user data from firebase------------------------
  
      useEffect(() => {
        let getingdata = async () => {
  
            const starCountRef = ref(db, `/User/${userId}`);
            onValue(starCountRef, async (snapshot) => {
                const data = await snapshot.val();
                //  console.log(data)
                // MediaKeyStatusMap
                setuser(data)
                // dispatch(getData(data))
            });
        }
  
        getingdata();
  
  
    }, [])




       // --------------------------geting all user data from firebase------------------------

  useEffect(() => {
    let getingdata = async () => {
      setChilds([])
      setalluser([])

        const starCountRef = ref(db, `/User`);
        onValue(starCountRef, async (snapshot) => {
            const data = await snapshot.val();
            
            // MediaKeyStatusMap
            setalluser(Object.values(data))
        });
    }

    getingdata()
    


}, [user])

useEffect(()=>{
  let thechilds=  alluser?.filter((elm)=>{
    if(elm?.parentId || elm?.id===userId){
     return elm?.parentId===userId || elm?.id===userId

    }
    })
    setChilds(thechilds)
    setfiltered(thechilds)
  },[alluser]);

console.log(filtered)


    let [selectVal,setselectVal]=useState('Sort')

    const handleChange = (event) => {
      setselectVal(event.target.value);
    };



let [modal,setmodal]=useState(false)

let handleModal=()=>{
  setmodal(!modal)
}


let [userdata,setuserdata]=useState({})


// -------------------------------------------------Sort functionality-------------------------------------------------


const sortByAscending = () => {
  const sortedData = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  setfiltered(sortedData);
};


const sortByDescending = () => {
  const sortedData = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
  setfiltered(sortedData);
};



// -------------------------------------------------Search functionality-------------------------------------------------


let [search , setsearch]=useState('')

  useEffect(() => {
    const result = childs.filter((user) => {
      return user?.name.toLowerCase().match(search.toLowerCase()) 

    })

    setfiltered(result);
  }, [search])







  return (
    <div class="w-[100%] min-h-[100vh] flex">
        <Sidebar/>
        <div class='w-[85%] h-[100%]'>
          <AnalyticsModal modal={modal} handleModal={handleModal} userdata={userdata}/>
      <div class=" w-[100%] h-[100px] mt-[35px] flex justify-center">
        <div class="w-[93%] flex justify-between ">
          <h2 class="text-4xl font-[500]">Analytics</h2>
        </div>
      </div>
      <div class="flex w-[100%]  justify-center">
        <div class="w-[94%] flex justify-end ">
        
          <div class="w-[320px]  relative mr-5">
            {/* <div class="ml-[10px] border h-[40px] rounded-md w-[140px] flex justify-center items-center text-gray-700 hover:bg-gray-100 cursor-pointer absolute right-0 top-[28px] font-[500]">
              Export via CSV
            </div> */}
            <div class="flex w-[320px]  absolute bottom-0">
              <div class="  border h-[42px] rounded-md w-[210px] flex justify-center items-center">
              <AiOutlineSearch className="text-gray-500 text-lg ml-2"/>
                <input
                  type="text"
                  placeholder="Search..."
                  class="border-none outline-none ml-2 w-[150px]"
                  onChange={(e)=>setsearch(e.target.value)}
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
                  {/* <MenuItem value={10}>Newest</MenuItem>
                  <MenuItem value={20}>Oldest</MenuItem> */}
                  <MenuItem value='A to Z' onClick={()=>sortByAscending()}>A to Z</MenuItem>
                  <MenuItem value='Z tO A' onClick={()=>sortByDescending()}>Z to A</MenuItem>

                </Select>
              </FormControl>
            </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div class="w-[100%] h-[300px] flex flex-col items-center justify-center">
        <h2 class="text-2xl font-[500]">No results</h2>
        <p class="text-gray-500 mt-3 flex">
        There are no card profiles in this category or matching your search query.
          <h2 class="font-[500] text-[#0b567f] cursor-pointer">Learn more.</h2>
        </p>
      </div> */}


{ filtered?.length>0 ?

<div className="w-[100%] flex justify-center">
<div className="w-[90%]  grid grid-cols-3 gap-x-4 gap-y-4">
{
  filtered?.map((elm)=>{
    return <>
    <div className="h-[150px] w-[300px] border rounded-lg mt-5 shadow-lg flex cursor-pointer" onClick={()=>{handleModal(),setuserdata(elm)}}>
<div className="h-[100%] w-[50%]  flex flex-col items-center justify-center">
<img src={elm?.profileUrl ? elm?.profileUrl :"https://placehold.co/90x90"} alt="profile" className="h-[70px] w-[70px] rounded-full shadow-sm " />
<h2 className="font-medium mt-[10px] text-center w-[98%]">{elm?.name}</h2>
</div>


<div className="h-[100%] w-[50%]  flex items-center justify-center">
<BsGraphUpArrow className="text-[50px] text-[#0b567f]"/>
</div>

</div>
    </>
  })
}



</div>
</div>
:

<div class="w-[100%] h-[300px] flex flex-col items-center justify-center">
        <h2 class="text-2xl font-[500]">No results</h2>
        <p class="text-gray-500 mt-3 flex">
        There are no card profiles in this category or matching your search query.
          <h2 class="font-[500] text-[#0b567f] cursor-pointer">Learn more.</h2>
        </p>
      </div>
}

    </div>
    </div>
  );
};

export default Analytics;
