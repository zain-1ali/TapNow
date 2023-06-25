import React from "react";
import {BiSignal4} from 'react-icons/bi'
import {AiOutlineWifi} from 'react-icons/ai'
import { returnIcons } from "../../assets/ReturnSocialIcons";
import { useDispatch, useSelector } from "react-redux";
import LeadForm from "./LeadForm";

const Mobile = ({user,link}) => {



  let dispatch = useDispatch();
  // ----------------------------------------------------State from redux---------------------------------------------
  const singlelink = useSelector(
    (state) => state.singleLinkHandeler.singleLink
  );

  // ----------------------------------------------------State from redux---------------------------------------------

const name = useSelector((state) => state.userInfoHandeler.userInfo.name)
const location = useSelector((state) => state.userInfoHandeler.userInfo.location)
const job = useSelector((state) => state.userInfoHandeler.userInfo.job)
const company = useSelector((state) => state.userInfoHandeler.userInfo.company)
const bio = useSelector((state) => state.userInfoHandeler.userInfo.bio)
const colorCode = useSelector((state) => state.userInfoHandeler.userInfo.colorCode)
const profileUrl = useSelector((state) => state.userInfoHandeler.userInfo.profileUrl)
const logoImg = useSelector((state) => state.userInfoHandeler.userInfo.logoImg)
const bgImg = useSelector((state) => state.userInfoHandeler.userInfo.bgImg)
const linkHighlighted = useSelector((state) => state.userInfoHandeler.userInfo.linkHighlighted)
const linkDescription = useSelector((state) => state.userInfoHandeler.userInfo.linkDescription)



  let checkAdded=(name)=>{

    return link?.some((elm)=>{
    return elm?.title===name
    })
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
const modal = useSelector((state) => state.modalHandeler.modal);
  return (
    <div className={` ${modal ? `max-h-[100vh]` :`min-h-[100vh]`}  h-[100%] w-[260px] border-[3px] rounded-3xl mt-5 border-[#e0e0e0] relative overflow-hidden `}>
      <div className="w-[100%]  flex justify-center h-[45px] rounded-t-3xl " style={{backgroundColor:hexToRGBA(colorCode)}}>
        
      { user?.leadMode && <LeadForm user={user}/>}

        
        <p className="text-xs font-medium mr-3 mt-1">5:34</p>
        <div className="bg-[#e0e0e0] h-[18px] w-[60%] rounded-b-2xl"></div>
        <BiSignal4 className='mt-1 ml-[2px]'/>
        <AiOutlineWifi className='mt-1 ml-[2px]'/>
      </div>
      <div className="max-h-[92%] h-[100%] overflow-y-scroll  scrollbar-hide ">
        <div className="w-[100%]  relative ">
          <div>
            <img
              src={bgImg ? bgImg :"https://placehold.co/260x90"}
              alt=""
              className="w-[100%] h-[90px] object-cover "
            />
            <div className="  absolute  left-[30%] top-[37px]">
              <div className="h-[95px] w-[95px] rounded-full   border-[5px] border-white relative ">
                <img
                  src={profileUrl ? profileUrl :"https://placehold.co/95x95"}
                  alt=""
                  className="h-[100%] w-[100%] rounded-full "
                />
                <div className="h-[35px] w-[35px] rounded-full   absolute bottom-[-5px] right-[-4px] ">
                  <img
                    src={logoImg ? logoImg : "https://placehold.co/35x35"}
                    alt="logo"
                    className="h-[100%] w-[100%] rounded-full object-cover   shadow-md border-[2px] border-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`w-[100%] min-h-[150px] shadow-lg `} style={{backgroundColor:hexToRGBA(colorCode),boxShadow:`10px 10px 5px 12px ${hexToRGBA(colorCode)}`}}>
          <div className="w-[100%] flex flex-col items-center">
            <h2 className="text-sm font-medium mt-[52px] ">{name}</h2>
            {
              job && company ? <p className="text-[9px] mt-1  text-[#a8aeb6] text-center w-[85%]">
              {job?.length<61?job : job?.substring(0,57)+'...'} at {company}
              </p>
              :
              <>
              <p className="text-[9px] mt-1  text-[#a8aeb6] text-center w-[85%]">{job}</p>
              <p className="text-[9px] mt-1  text-[#a8aeb6] text-center w-[85%]">{company}</p>

              </>
            }
            
            <p className="text-[9px] mt-1  text-[#a8aeb6]">{location}</p>
            <div className="w-[90%]">
              <p className="text-[9px] mt-2 text-center text-[#a8aeb6] ">
              {bio}
              </p>
            </div>
            <div
            style={{backgroundColor:colorCode}}
              className={`h-[36px] w-[80%] rounded-3xl border mt-3  flex justify-center items-center text-sm font-medium text-white cursor-pointer` }
            //   style="background-color: rgb(235, 87, 87);"
            >
              Save Contact
            </div>
          </div>
        </div>
        <div className="w-[100%] grid grid-cols-3 gap-x-4 mt-3">

      {singlelink.img &&  <div className="h-[70px] w-[70px]  flex flex-col items-center mt-5" style={checkAdded(singlelink?.name) || linkHighlighted ?{display:'none'}:null}>
<img
  src={singlelink.img}
  alt="social"
  className="h-[40px] w-[40px] "
/>
<p className="text-[11px] mt-1 font-medium w-[95%] text-center">{singlelink?.name?.length<17?singlelink?.name : singlelink?.name?.substring(0,16)+'...'}</p>
</div>}


          {
            link?.map((elm)=>{
return <div className="h-[70px] w-[70px]  flex flex-col items-center mt-5" style={elm?.isHide===true || elm?.isHighLighted===true ?{display:'none'}:null}>
<img
  src={returnIcons(elm?.title)}
  alt="social"
  className="h-[40px] w-[40px] "
/>
<p className="text-[11px] mt-1 font-medium w-[95%] text-center">{elm?.name?.length<17?elm?.name : elm?.name?.substring(0,16)+'...'}</p>
</div>
            })
          }
          



          
  
        </div>


        <div className="w-[100%] ">
        {linkHighlighted &&
  <>
  <div className="w-[100%] h-[65px] mt-1 bg-[#f7f7f7] flex">
<div className="w-[30%]  flex justify-center items-center">
<img src={singlelink.img} alt=""  className="h-[50px] w-[50px]"/>
</div>

<div className="w-[70%] flex flex-col justify-evenly">
<h2 className="font-medium ">{singlelink?.name?.length<17?singlelink?.name : singlelink?.name?.substring(0,16)+'...'}</h2>
<p className="text-[10px] w-[90%] ">{} {linkDescription?.length<67?linkDescription : linkDescription.substring(0,67)+'...'}</p>
{/* 68 */}
</div>
</div>
  </>
  }

{
link?.map((elm)=>{
  return  <>
  <div className="w-[100%] h-[65px] mt-4 bg-[#f7f7f7] flex" style={elm?.isHide===true || elm?.isHighLighted===false ?{display:'none'}:null}>
<div className="w-[30%]  flex justify-center items-center">
<img src={returnIcons(elm?.title)} alt=""  className="h-[50px] w-[50px]"/>
</div>

<div className="w-[70%] flex flex-col justify-evenly">
<h2 className="font-medium ">{elm?.name?.length<17?elm?.name : elm?.name?.substring(0,16)+'...'}</h2>
<p className="text-[10px] w-[90%] ">{} {elm?.description?.length<67?elm?.description : elm?.description.substring(0,67)+'...'}</p>
{/* 68 */}
</div>
</div>
  </>
})
}


</div>

      </div>


     

    </div>
  );
};

export default Mobile;
