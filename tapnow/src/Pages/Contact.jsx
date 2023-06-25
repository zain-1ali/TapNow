import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {HiOutlineInformationCircle} from 'react-icons/hi'
import {AiOutlineSearch, AiTwotoneDelete} from 'react-icons/ai'
import { onValue, ref } from "firebase/database";
import { db } from "../Firebase";
import ContactModal from "../components/ContactModal";

const Contact = () => {
  let userId=localStorage.getItem('tapNowUid')

    let [selectVal,setselectVal]=useState('')
    let [contacts,setcontacts]=useState([])
    let [filtered,setfiltered]=useState([])

let handleChange=()=>{

}



// --------------------------geting all user data from firebase------------------------
let [alluser,setalluser]=useState([])
let [childs,setChilds]=useState([])
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


}, [])

useEffect(()=>{
let thechilds=  alluser?.filter((elm)=>{
  if(elm?.parentId || elm?.id===userId ){
   return elm?.parentId===userId || elm?.id===userId

  }
  })
  setChilds(thechilds)
  // setfiltered(thechilds)
},[alluser]);

// Function to recursively flatten nested objects
// let flattenObject=(obj)=> {
//   return Object.values(obj).flatMap(value => {
//     if (typeof value === 'object' && !Array.isArray(value)) {
//       return [value];
//     } else if (typeof value === 'object' && Array.isArray(value)) {
//       return extractObjects(value);
//     }
//     return [];
//   });
// }
useEffect(()=>{
  // const contactsArray = childs?.map(obj =>obj?.contactRequests && flattenObject(obj?.contactRequests) )
  // setcontacts(contactsArray)
  const contactsArray=childs?.map((elm)=>{
if(elm?.contactRequests){

  return Object.values(elm?.contactRequests)
}
else{
  return []
}
})
const flattenedArray = [].concat(...contactsArray);
setcontacts(flattenedArray)
setfiltered(flattenedArray)

  },[childs]);
  
  console.log(contacts)



  let [contactModal,setcontactModal]=useState(false)
  let [deleteModal,setdeleteModal]=useState(false)
  let [contactDetails,setcontactDetails]=useState({})
  
  


  let handlecontactModal=()=>{
    setcontactModal(!contactModal)
  }

  let handledeleteCloseModal=()=>{
    setdeleteModal(false)
  }

  let handledeleteOpenModal=()=>{
    setdeleteModal(true)
  }


   //---------------------------------------------------(search functionality)-----------------------------------------------


let [search , setsearch]=useState('')

useEffect(() => {
  const result = contacts.filter((contact) => {
    return contact?.name.toLowerCase().match(search.toLowerCase()) || contact?.email.toLowerCase().match(search.toLowerCase()) 

  })

  setfiltered(result);
}, [search])

  return (
    <div class="w-[100%] max-h-[100vh] flex">
        <Sidebar/>
        <div class='w-[85%] overflow-y-scroll scrollbar-hide'>
          <ContactModal contactModal={contactModal} handlecontactModal={handlecontactModal} contactDetails={contactDetails} deleteModal={deleteModal} handledeleteModal={handledeleteCloseModal}/>
      <div class=" w-[100%] h-[100px] mt-[35px] flex justify-center">
        <div class="w-[93%] flex justify-between ">
          <h2 class="text-4xl font-[500]">Contacts</h2>
        </div>
      </div>
      <div class="flex w-[100%]  justify-center">
        <div class="w-[94%] flex justify-between ">
          <div class="w-[420px] h-[120px] rounded-md bg-[#b2d9ee] flex justify-center items-center">
            <div class="w-[90%] h-[85%] ">
              <div class="w-[100%] flex ">
                <div>
                  <HiOutlineInformationCircle class="text-xl mt-[2px]"/>
                </div>
                <p class="ml-[12px] font-[500]">
                  Ensure you have enabled contact exchange
                </p>
              </div>
              <p class="ml-[30px] mt-1 text-gray-500">
                These are the contacts you have received if contact exchange is
                enabled on your profile.
              </p>
              <div class=" w-[115px] ml-[30px] cursor-pointer flex justify-between font-[500] text-[#0b567f] items-center">
                Learn more
                <div>
                  {/* <svg
                    class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="ArrowRightAltOutlinedIcon"
                  >
                    <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z"></path>
                  </svg> */}
                </div>
              </div>
            </div>
          </div>
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
                value={search}
                />
              </div>


              <div class="ml-[10px] border h-[40px] rounded-md w-[140px] flex justify-center items-center text-gray-700 hover:bg-gray-100 cursor-pointer  font-[500]">
              Export via CSV
            </div>
              {/* <div className="ml-[10px]">
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
                  <MenuItem value={10}>Newest</MenuItem>
                  <MenuItem value={20}>Oldest</MenuItem>
                  <MenuItem value={30}>A tO Z</MenuItem>
                  <MenuItem value={40}>Z tO A</MenuItem>

                </Select>
              </FormControl>
            </div> */}
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

      <div className="w-[80%] flex justify-around  mt-6" >
<h2 className="text-sm font-medium text-gray-700">Contact</h2>
<h2 className="text-sm font-medium text-gray-700">Email</h2>
<h2 className="text-sm font-medium text-gray-700">Conected with</h2>
<h2 className="text-sm font-medium text-gray-700 ">Date</h2>

      </div>

      <div className="w-[100%] px-7 overflow-y-scroll scrollbar-hide flex flex-col items-center h-[355px]">
        {
          filtered?.map((elm)=>{
            return <>
            <div className="bg-[#fafafa] w-[100%] h-[70px] rounded-[30px] mt-3 shadow-sm flex justify-around items-center cursor-pointer" onClick={()=>{handlecontactModal(),setcontactDetails(elm)}}>

<div className="flex items-center w-[10%] ">
<img src={elm?.imgUrl ? elm?.imgUrl :"https://placehold.co/35x35"} alt="img" className="h-[45px] w-[45px] rounded-full shadow-md mr-6"/>
<h2 className="text-sm font font-medium">{elm?.name}</h2>
</div>


<div className="w-[10%] ">
<h2 className="text-sm font font-medium">{elm?.email}</h2>
</div>



<div className="flex items-center mr-2 w-[10%] ">
<img src={elm?.connectedWith?.img?elm?.connectedWith?.img:"https://placehold.co/35x35"} alt="img" className="h-[35px] w-[35px] rounded-full shadow-md mr-5"/>
<h2 className="text-sm font font-medium">{elm?.connectedWith?.name}</h2>
</div>

<div className="w-[10%] ">
<h2 className="text-sm font font-medium">{elm?.date}</h2>
</div>

{/* <div className="w-[1%]"> */}
<AiTwotoneDelete className="text-red-600 text-2xl" onClick={()=>handledeleteOpenModal()}/>
{/* </div> */}



</div>
            </>
          })
        }

      </div>
    </div>
    </div>
  );
};

export default Contact;
