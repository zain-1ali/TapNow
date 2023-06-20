import { Box, Modal } from '@mui/material'
import { push, ref, update } from 'firebase/database'
import React, { useState } from 'react'
import {BsFillPersonFill} from 'react-icons/bs'

import {BsFillPeopleFill} from 'react-icons/bs'
import { db } from '../../Firebase'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';


const OptionModal = ({modal,handleModal,user,handleTeamModal}) => {

    let [showmsg,setshowmsg]=useState(false)

// --------------------------------------------------Generate Random number----------------------------------

let randNum=()=>{
    let val = Math.floor(1000 + Math.random() * 9000)
    return val
}

// --------------------------------------------------Create Single self profile----------------------------------


let createSelfProfile=()=>{
  let pushkey=  push(ref(db , `User/` ), { parentId: user?.id , name:user?.name,userName:user?.userName + randNum() , email:user?.email,bgImg:'',bio:'',job:'',colorCode:'#2f80ed',company:'',directMode:false ,qrColor:'',qrLogo:'',phone:'',logoImg:'',leadForm:{Fname:true,company:true,email:true,job:true,note:true,phone:true},leadMode:false ,location:'',formHeader:''}).key
  update(ref(db , `User/${pushkey}` ),{id:pushkey}).then(()=>{
    handleModal()
    toast.success('New profile created successfuly')
  })
}

    const style2 = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 340,
        height: 180,
        bgcolor: "white",
        // border: '2px solid #000',
        boxShadow: 24,
        border:'none',
        outline:'none',
        borderRadius:'18px'
        // p: "32px",
      };

  return (
    <div>
        <Modal
        open={modal}
        onClose={() =>handleModal() }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box 
         sx={style2}>
<div className='h-[100%] w-[100%] flex items-center flex-col '>
{
    !showmsg ?
    <>
    
<div className='w-[90%]  h-[25px] mt-3 font-medium text-lg'>
Who is this card for ?
</div>
<div className='w-[100%] flex justify-center mt-4'>
<div className='border h-[100px] w-[120px] rounded-xl mr-4 flex flex-col items-center justify-center cursor-pointer' onClick={()=>setshowmsg(true)}>
<BsFillPersonFill className='text-3xl'/>
<h2 className='font-medium text-sm'>Myself</h2>
</div>


<div className='border h-[100px] w-[120px] rounded-xl ml-4 flex flex-col items-center justify-center cursor-pointer' onClick={()=>{handleTeamModal(),handleModal()}}>
<BsFillPeopleFill className='text-3xl'/>
<h2 className='font-medium text-sm'>A Team Member</h2>
</div>
</div> 
</>

:
<>

<div className='w-[100%] flex justify-center mt-12'>
<h2 className='text-lg font-medium'>
Are you sure to create a new profile ?
</h2>
</div>

<div className='w-[100%] flex justify-center mt-4'>
<div className='h-[40px] w-[100px] bg-black mr-2 rounded-full text-white flex justify-center items-center cursor-pointer' onClick={()=>createSelfProfile()}>
Yes
</div>
<div className='h-[40px] w-[100px] bg-black ml-2 rounded-full text-white flex justify-center items-center cursor-pointer' onClick={()=>{handleModal(),setshowmsg(false)}}>
No
</div>
</div>
</>}
</div>
         </Box>

        </Modal>
      <ToastContainer position="top-center" autoClose={2000} />

    </div>
  )
}

export default OptionModal