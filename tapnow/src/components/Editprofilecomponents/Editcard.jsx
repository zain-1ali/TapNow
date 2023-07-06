import React, { useEffect, useState } from "react";
import {BsFillHddStackFill} from 'react-icons/bs'
import {BsFillPersonFill} from 'react-icons/bs'
import {BsQrCode} from 'react-icons/bs'
import {FiFilter} from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { openContent,openAbout,openQr,openLead } from '../../Redux/Profileeditslice'
import Content from "./Content";
import { onValue, ref, set } from "firebase/database";
import { db } from "../../Firebase";
import Mobilecontainer from "./Mobilecontainer";
import About from "./About";
import Qrcode from "./Qrcode";
import Leadcapture from "./Leadcapture";
import { setName,setBio,setColor,setCompany,setJob,setLocation,setProfileImg,setlogoImg,setBgImg } from '../../Redux/UserinfoSlice'
import Qrcontainer from "./Qrcontainer";
import {setQrLogo,setQrColor} from '../../Redux/UserinfoSlice'
import {setFormHeader} from '../../Redux/UserinfoSlice'
import { Addlinks } from "../../Redux/LinksSlice";






const Editcard = ({userID}) => {

    const iscontent = useSelector((state) => state.profileEditHandeler.isContent)
    const isabout = useSelector((state) => state.profileEditHandeler.isAbout)
    const isqr = useSelector((state) => state.profileEditHandeler.isQr)
    const islead = useSelector((state) => state.profileEditHandeler.isLead)

    const dispatch = useDispatch()


    let [user,setuser]=useState({})
    let [link,setlink]=useState([])



    useEffect(()=>{
      dispatch(setName(user?.name))
      dispatch(setLocation(user?.location))
      dispatch(setCompany(user?.company))
      dispatch(setJob(user?.job))
      dispatch(setColor(user?.colorCode))
      dispatch(setBio(user?.bio))
      dispatch(setProfileImg(user?.profileUrl))
      dispatch(setlogoImg(user?.logoImg))
      dispatch(setBgImg(user?.bgImg))
      dispatch(setQrColor(user?.qrColor))
      dispatch(setQrLogo(user?.qrLogo))
dispatch(setFormHeader(user?.formHeader))

  
  
      
          },[user])

    // --------------------------geting the user data from firebase------------------------

    useEffect(() => {
        let getingdata = async () => {
  
            const starCountRef = ref(db, `/User/${userID}`);
            onValue(starCountRef, async (snapshot) => {
                const data = await snapshot.val();
                //  console.log(data)
                // MediaKeyStatusMap
                setuser(data)
                setlink(Object.values(data?.links))
                dispatch(Addlinks(Object.values(data?.links)))


  
                // updateStarCount(postElement, data);
            });
        }
  
        getingdata();
  
  
    }, [])

    

console.log(user)



  return (
    <div className="flex">
      <div class="h-[540px] w-[730px] bg-white rounded-l-2xl border mt-5 flex shadow-xl">
        <div class="w-[200px]  border-r h-[100%] p-5">
          <div class="w-[160px]  flex items-center rounded-lg h-[40px] hover:bg-[#b2d9ee] p-3 cursor-pointer mt-4" onClick={()=>dispatch(openContent())} style={iscontent ? {backgroundColor :'#b2d9ee'}:null}>
            <BsFillHddStackFill className="text-[#0b567f]"/>
            <p class=" ml-2">Content</p>
          </div>
          <div class="w-[160px]  flex items-center rounded-lg h-[40px] hover:bg-[#b2d9ee] p-3 cursor-pointer mt-4" onClick={()=>dispatch(openAbout())} style={isabout ? {backgroundColor :'#b2d9ee'}:null}>
          <BsFillPersonFill className="text-[#0b567f]"/>
            <p class=" ml-2">About</p>
          </div>
          <div class="w-[160px]  flex items-center rounded-lg h-[40px] hover:bg-[#b2d9ee] p-3 cursor-pointer mt-4" onClick={()=>dispatch(openQr())} style={isqr ? {backgroundColor :'#b2d9ee'}:null}>
          <BsQrCode className="text-[#0b567f]"/>
            <p class=" ml-2">Qr code</p>
          </div>
          <div class="w-[160px]  flex items-center rounded-lg h-[40px] hover:bg-[#b2d9ee] p-3 cursor-pointer mt-4" onClick={()=>dispatch(openLead())} style={islead ? {backgroundColor :'#b2d9ee'}:null}>
          <FiFilter className="text-[#0b567f]"/>
            <p class=" ml-2">Lead capture</p>
          </div>

        </div>

        {iscontent &&  <Content user={user} link={link}/>}
        {isabout &&  <About user={user} link={link}/>}
        {isqr &&  <Qrcode user={user} link={link}/>}
        {islead &&  <Leadcapture user={user} link={link}/>}





      </div>
      
      {isqr ? <Qrcontainer user={user}/> : <Mobilecontainer user={user} link={link}/>}
    </div>
  );
};

export default Editcard;
