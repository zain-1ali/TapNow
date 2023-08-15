import React, { useEffect, useState } from "react";
import google from "../../imgs/google.png";
import fb from "../../imgs/fblogo.png";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { onValue, ref } from "firebase/database";
import {
  handleSignUpFacebook,
  handleSignUpGoogle,
} from "../services/ExternalAuthSrvc";
import MediaQuery from "react-responsive";

const Login = () => {
  let [objkeys, setobjkeys] = useState([]);

  // --------------------------geting the all users data from firebase------------------------

  useEffect(() => {
    let getingdata = async () => {
      const starCountRef = ref(db, `User/`);
      onValue(starCountRef, async (snapshot) => {
        // const data = await snapshot.val();
        setobjkeys(Object.keys(snapshot.val()));

        // MediaKeyStatusMap
      });
    };

    getingdata();
  }, []);
  // console.log(objkeys);

  let [showPass, setShowPass] = useState(false);

  let toggleShowPass = () => {
    setShowPass(!showPass);
  };

  let navigate = useNavigate();
  // let currentUser=localStorage.getItem('tapNowUid')

  //   useEffect(()=>{
  // if(!currentUser){
  // <Navigate to={'/'}/>
  // }else{
  // <Navigate to={'/home'}/>

  // }
  //   },[])

  let [data, setdata] = useState({
    email: "",
    password: "",
  });

  // ------------------------------Handle Login-----------------------------

  const handleLogin = () => {
    if (data.email && data.password) {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          const starCountRef = ref(db, `/User/${user?.uid}`);
          onValue(starCountRef, async (snapshot) => {
            const data = await snapshot.val();
            // MediaKeyStatusMap
            // console.log(data.parentId)
            if (data?.parentId) {
              const starCountRef2 = ref(db, `/User/${data?.parentId}`);
              onValue(starCountRef2, async (thesnapshot) => {
                const parentdata = await thesnapshot.val();
                // MediaKeyStatusMap
                // console.log(parentdata)
                if (parentdata?.allowTeamLogin === true) {
                  localStorage.setItem("tapNowUid", user.uid);
                  navigate("/home");
                  toast.success("Login Sucessfuly");
                  window.location.reload(true);
                } else {
                  toast.warning("Access Denied!");
                }
              });
            } else {
              localStorage.setItem("tapNowUid", user.uid);
              toast.success("Login Sucessfuly");
              navigate("/home");
              window.location.reload(true);
            }
          });

          // toast.success('Login Sucessfuly')

          // navigate('/home')

          // ...
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          // alert(errorMessage)

          if (error.message === "Firebase: Error (auth/user-not-found).") {
            toast.error("User not Found !");
          } else if (
            error.message === "Firebase: Error (auth/wrong-password)."
          ) {
            toast.error("Wrong Password !");
          }
        });
    } else {
      toast.error("Email and password should not be empty!");
    }
  };

  return (
    <div className="h-[100vh] w-[100%] border bg-[#f7f7f7]">
      <div className="h-[100%] w-[100%] laptop:w-[49%]  bg-white laptop:rounded-r-[50px] shadow-xl  pt-2 border">
        <div class="w-[100%] flex justify-center items-center ">
          <div class=" text-xl font-medium ml-2 text-black  mr-5">
            T A P N O W
          </div>
          <div class="border h-7 mr-2 border-gray-400"></div>
          <h2 class="text-xl font-medium ml-2 text-gray-400">Login</h2>
        </div>

        <div class="w-[100%] text-center mt-4 text-lg font-medium  text-gray-400">
          Get started with #1 digital bussiness card platform
        </div>

        {/* ---------------------------------------------input tags-------------------------------------- */}

        <div className="w-[100%] mt-3 flex items-center flex-col">
          <div class=" laptop:w-[70%] w-[80%] mt-3">
            <h2 class="text-sm font-medium ">Email</h2>
            <input
              type="text"
              placeholder="Email"
              class="mt-2 outline-none border-none w-[100%] h-[50px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
              onChange={(e) => {
                setdata({ ...data, email: e.target.value });
              }}
              value={data.email}
            />
          </div>

          <div class="laptop:w-[70%] w-[80%] mt-3">
            <h2 class="text-sm font-medium ">Password</h2>
            <div class="w-[100%] h-[50px] bg-[#f7f7f7] flex mt-2 items-center rounded-lg">
              <input
                type={showPass ? `text` : `password`}
                placeholder="Password"
                class=" outline-none rounded-lg border-none w-[92%] h-[50px] bg-[#f7f7f7]  p-5 placeholder:text-sm"
                onChange={(e) => {
                  setdata({ ...data, password: e.target.value });
                }}
                value={data.password}
              />
              {showPass ? (
                <AiFillEye
                  class="text-xl cursor-pointer"
                  onClick={() => toggleShowPass()}
                />
              ) : (
                <AiFillEyeInvisible
                  class="text-xl cursor-pointer"
                  onClick={() => toggleShowPass()}
                />
              )}
            </div>
          </div>
          <div
            class="laptop:mt-5 mt-7  laptop:w-[50%] w-[70%] h-[40px] bg-black rounded-3xl text-white flex justify-center items-center cursor-pointer"
            onClick={() => handleLogin()}
          >
            Login
          </div>

          <div
            class="laptop:mt-3 mt-5  laptop:w-[50%] w-[70%] h-[40px] text-sm font-medium  rounded-3xl  flex justify-center items-center border cursor-pointer  hover:bg-[#f7f7f7]"
            onClick={() => handleSignUpGoogle(objkeys, navigate)}
          >
            <img src={google} alt="" class="h-[30px] w-[30px] mr-4" />
            Continue with Google
          </div>
          <div
            class="laptop:mt-3 mt-5  laptop:w-[50%] w-[70%] h-[40px] text-sm font-medium  rounded-3xl  flex justify-center items-center border cursor-pointer  hover:bg-[#f7f7f7]"
            onClick={() => handleSignUpFacebook(objkeys, navigate)}
          >
            <img src={fb} alt="" class="h-[30px] w-[30px] mr-4" />
            Continue with Facebook
          </div>

          <div class="flex mt-3">
            <h2 class="font-medium">Already have account ?</h2>
            <Link class="ml-2 font-medium text-[#0b567f]" to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Login;
