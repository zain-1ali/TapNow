import React, { useEffect, useState } from 'react'
import google from '../../imgs/google.png'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../Firebase'
import { ref, update } from 'firebase/database'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {AiFillEye} from 'react-icons/ai'
import {AiFillEyeInvisible} from 'react-icons/ai'

const Register = () => {


  let [showPass,setShowPass]=useState(false)

  let toggleShowPass=()=>{
   setShowPass(!showPass)
  }

let [data,setdata]=useState({
  email:'',
  password:'',
  name:'',
  userName:''
})

let navigate=useNavigate()

//   useEffect(()=>{
//     let currentUser=localStorage.getItem('tapNowUid')
// if(!currentUser){
// <Navigate to={'/'}/>
// }else{
// <Navigate to={'/home'}/>

// }
  // },[])


// -----------------------------------Handle register------------------------------------ 
const addData = async () => {
  if (data.userName && data.email && data.password) {
      await createUserWithEmailAndPassword(auth, data.email, data.password)
          .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
              localStorage.setItem('tapNowUid',user.uid)

              // console.log(user.uid)
              update(ref(db, `User/${user.uid}`), { id: user.uid , name:data?.name,userName:data?.userName,email:data.email,bgImg:'',bio:'',job:'',colorCode:'#2f80ed',company:'',directMode:false ,qrColor:'',qrLogo:'',phone:'',logoImg:'',leadForm:{Fname:true,company:true,email:true,job:true,note:true,phone:true},leadMode:false ,location:'',formHeader:'',allowTeamLogin:true,loginAllow:true}).then(()=>{
              toast.success('New user created sucessfuly')
              navigate('/home')

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
        username:''
      })

  }
  else {
      toast.error('Email , password and user name should not be empty')
  }
}


  return (
    <div className='h-[100vh] w-[100%] border bg-[#f7f7f7]'>
      <div className='h-[100%] w-[49%] bg-white rounded-r-[50px] shadow-xl  pt-2'>
        <div class="w-[100%] flex justify-center items-center ">
          <div class=" text-xl font-medium ml-2 text-gray-400  mr-5">T A P  N O W</div>
          <div class="border h-7 mr-2 border-gray-400"></div>
          <h2 class="text-xl font-medium ml-2 text-gray-400">Create your first card</h2>
          </div>


          <div class="w-[100%] text-center mt-4 text-lg font-medium  text-gray-400">Get started with #1 digital bussiness card platform</div>


          {/* ----------------------------------input tags----------------------------- */}

          <div className='w-[100%] mt-3 flex items-center flex-col'>
          <div class="w-[70%] mt-3"><h2 class="text-sm font-medium ">Email</h2><input type="text" placeholder="Email" class="mt-2 outline-none border-none w-[100%] h-[50px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm" onChange={(e) => { setdata({ ...data, email: e.target.value }) }} value={data.email}/></div>
          <div class="w-[70%] mt-3"><h2 class="text-sm font-medium ">Password</h2><div class='w-[100%] h-[50px] bg-[#f7f7f7] flex mt-2 items-center rounded-lg'><input type={ showPass? `text` :`password`} placeholder="Password" class=" outline-none rounded-lg border-none w-[92%] h-[50px] bg-[#f7f7f7]  p-5 placeholder:text-sm" onChange={(e) => { setdata({ ...data, password: e.target.value }) }} value={data.password}/>{showPass ? <AiFillEye class='text-xl cursor-pointer' onClick={()=>toggleShowPass()}/>: <AiFillEyeInvisible class='text-xl cursor-pointer' onClick={()=>toggleShowPass()}/>}</div></div>
          <div class="w-[70%] mt-3"><h2 class="text-sm font-medium ">Name</h2><input type="text" placeholder="Name" class="mt-2 outline-none border-none w-[100%] h-[50px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm" onChange={(e) => { setdata({ ...data, name: e.target.value }) }} value={data.name}/></div>
          <div class="w-[70%] mt-3"><h2 class="text-sm font-medium ">User Name</h2><input type="text" placeholder="User name" class="mt-2 outline-none border-none w-[100%] h-[50px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm" onChange={(e) => { setdata({ ...data, userName: e.target.value }) }} value={data.userName}/></div>

          <div class="mt-5  w-[50%] h-[40px] bg-black rounded-3xl text-white flex justify-center items-center cursor-pointer" onClick={()=>addData()}>Create Account</div>

          <div class="mt-3  w-[50%] h-[40px] text-sm font-medium  rounded-3xl  flex justify-center items-center border cursor-pointer  hover:bg-[#f7f7f7]"><img src={google} alt="" class="h-[30px] w-[30px] mr-4"/>Continue with Google</div>

          <div class="flex mt-3"><h2 class="font-medium">Already have account ?</h2><Link class="ml-2 font-medium text-[#0b567f]" to="/">Login</Link></div>

          </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  )
}

export default Register