import React, { useEffect, useState } from "react";
import {BsFillHddStackFill} from 'react-icons/bs'
import {BsFillPersonFill} from 'react-icons/bs'
import {BsQrCode} from 'react-icons/bs'
import {FiFilter} from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { openContent,openAbout,openQr,openLead } from '../../Redux/Profileeditslice'
import Content from "./Content";
import { onValue, ref } from "firebase/database";
import { db } from "../../Firebase";
import Mobilecontainer from "./Mobilecontainer";


const Editcard = ({userID}) => {

    const iscount = useSelector((state) => state.profileEditHandeler.isContent)
    const isabout = useSelector((state) => state.profileEditHandeler.isAbout)
    const isqr = useSelector((state) => state.profileEditHandeler.isQr)
    const islead = useSelector((state) => state.profileEditHandeler.isLead)



    let [user,setuser]=useState({})
    let [link,setlink]=useState([])

    // --------------------------geting the user data from firebase------------------------

    useEffect(() => {
        let getingdata = async () => {
  
            const starCountRef = ref(db, `/User/${userID}`);
            onValue(starCountRef, async (snapshot) => {
                const data = await snapshot.val();
                //  console.log(data)
                MediaKeyStatusMap
                setuser(data)
                setlink(Object.values(data?.links))
  
                // updateStarCount(postElement, data);
            });
        }
  
        getingdata();
  
  
    }, [])

console.log(user)


    const dispatch = useDispatch()

  return (
    <div className="flex">
      <div class="h-[540px] w-[730px] bg-white rounded-l-2xl border mt-5 flex shadow-xl">
        <div class="w-[200px]  border-r h-[100%] p-5">
          <div class="w-[160px]  flex items-center rounded-lg h-[40px] hover:bg-[#b2d9ee] p-3 cursor-pointer mt-4" onClick={()=>dispatch(openContent())}>
            <BsFillHddStackFill className="text-[#0b567f]"/>
            <p class=" ml-2">Content</p>
          </div>
          <div class="w-[160px]  flex items-center rounded-lg h-[40px] hover:bg-[#b2d9ee] p-3 cursor-pointer mt-4" onClick={()=>dispatch(openAbout())}>
          <BsFillPersonFill className="text-[#0b567f]"/>
            <p class=" ml-2">About</p>
          </div>
          <div class="w-[160px]  flex items-center rounded-lg h-[40px] hover:bg-[#b2d9ee] p-3 cursor-pointer mt-4" onClick={()=>dispatch(openQr())}>
          <BsQrCode className="text-[#0b567f]"/>
            <p class=" ml-2">Qr code</p>
          </div>
          <div class="w-[160px]  flex items-center rounded-lg h-[40px] hover:bg-[#b2d9ee] p-3 cursor-pointer mt-4" onClick={()=>dispatch(openLead())}>
          <FiFilter className="text-[#0b567f]"/>
            <p class=" ml-2">Lead capture</p>
          </div>

        </div>

<Content user={user} link={link}/>


      </div>
      <Mobilecontainer user={user} link={link}/>
    </div>
  );
};

export default Editcard;
