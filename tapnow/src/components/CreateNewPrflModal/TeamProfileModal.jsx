import { Box, Modal } from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth, db } from '../../Firebase'
import { update,ref } from 'firebase/database'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
// import { ref } from 'firebase/storage'

const  TeamProfileModal = ({teamModal, handleTeamModal}) => {


// 
let parentId=localStorage.getItem('tapNowUid')

  let [data,setdata]=useState({
    email:'',
    password:'',
    name:'',
    userName:''
  })
  
  
  // -----------------------------------Handle register------------------------------------ 
  const addData = async () => {
    if (data.userName && data.email && data.password) {
        await createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // console.log(user.uid)
                update(ref(db, `User/${user.uid}`), {parentId, id: user.uid , name:data?.name,userName:data?.userName,email:data.email,bgImg:'',bio:'',job:'',colorCode:'#2f80ed',company:'',directMode:false ,qrColor:'',qrLogo:'',phone:'',logoImg:'',leadForm:{Fname:true,company:true,email:true,job:true,note:true,phone:true},leadMode:false ,location:'',formHeader:'',isSelf:false,allowTeamLogin:true,loginAllow:true}).then(()=>{
                toast.success('New user created sucessfuly')
                handleTeamModal()
  
                })
  
            })
            .catch((error) => {
                const errorCode = error.code;
                //   const errorMessage = error.message;
                console.log(error.message)
                if (error.message === 'Firebase: Error (auth/invalid-email).') {
                    toast.error('Please enter valid email')
                }
                else if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                    toast.error('Email already exits')
                }
                else if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                    toast.error('Password must be at least 6 characters')
                }
  
                // ..
            });
  
  
  
  
  
        setdata({
          email:'',
          password:'',
          name:'',
          userName:''
        })
  
    }
    else {
        toast.error('Email , password and user name should not be empty')
    }
  }


  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 370,
    height: 480,
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
        open={teamModal}
        onClose={() =>handleTeamModal() }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box 
         sx={style2}>

 {/* ----------------------------------input tags----------------------------- */}
<>
 <div className='w-[100%] mt-3 flex items-center flex-col'>
          <div class="w-[70%] mt-3"><h2 class="text-sm font-medium ">Email</h2><input type="text" placeholder="Email" class="mt-2 outline-none border-none w-[100%] h-[50px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm" onChange={(e) => { setdata({ ...data, email: e.target.value }) }} value={data.email}/></div>
          <div class="w-[70%] mt-3"><h2 class="text-sm font-medium ">Password</h2><input type="text" placeholder="Password" class="mt-2 outline-none border-none w-[100%] h-[50px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm" onChange={(e) => { setdata({ ...data, password: e.target.value }) }} value={data.password}/></div>
          <div class="w-[70%] mt-3"><h2 class="text-sm font-medium ">Name</h2><input type="text" placeholder="Name" class="mt-2 outline-none border-none w-[100%] h-[50px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm" onChange={(e) => { setdata({ ...data, name: e.target.value }) }} value={data.name}/></div>
          <div class="w-[70%] mt-3"><h2 class="text-sm font-medium ">User Name</h2><input type="text" placeholder="User name" class="mt-2 outline-none border-none w-[100%] h-[50px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm" onChange={(e) => { setdata({ ...data, userName: e.target.value }) }} value={data.userName}/></div>

          <div class="mt-5  w-[50%] h-[40px] bg-black rounded-3xl text-white flex justify-center items-center cursor-pointer" onClick={()=>addData()}>Create Account</div>

          </div>
      <ToastContainer position="top-center" autoClose={2000} />

          </>
         </Box>

</Modal>
    </div>
  )
}

export default TeamProfileModal