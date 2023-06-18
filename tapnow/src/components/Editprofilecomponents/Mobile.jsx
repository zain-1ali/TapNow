import React from "react";
import {BiSignal4} from 'react-icons/bi'
import {AiOutlineWifi} from 'react-icons/ai'
import { returnIcons } from "../../assets/ReturnSocialIcons";
import { useDispatch, useSelector } from "react-redux";

const Mobile = ({user,link}) => {



  let dispatch = useDispatch();
  // ----------------------------------------------------State from redux---------------------------------------------
  const singlelink = useSelector(
    (state) => state.singleLinkHandeler.singleLink
  );


  let checkAdded=(name)=>{

    return link?.some((elm)=>{
    return elm?.title===name
    })
      }


  return (
    <div className=" min-h-[90vh] w-[260px] border-[3px] rounded-3xl mt-5 border-[#e0e0e0] relative">
      <div className="w-[100%]  flex justify-center h-[45px] rounded-t-3xl  bg-[#eaf2fd] ">
        <p className="text-xs font-medium mr-3 mt-1">5:34</p>
        <div className="bg-[#e0e0e0] h-[18px] w-[60%] rounded-b-2xl"></div>
        <BiSignal4 className='mt-1 ml-[2px]'/>
        <AiOutlineWifi className='mt-1 ml-[2px]'/>
      </div>
      <div className="min-h-[435px] overflow-y-scroll  scrollbar-hide">
        <div className="w-[100%]  relative ">
          <div>
            <img
              src={user?.bgImg}
              alt=""
              className="w-[100%] h-[90px] object-cover "
            />
            <div className="  absolute  left-[30%] top-[37px]">
              <div className="h-[95px] w-[95px] rounded-full   border-[5px] border-white relative ">
                <img
                  src={user?.profileUrl}
                  alt=""
                  className="h-[100%] w-[100%] rounded-full "
                />
                <div className="h-[35px] w-[35px] rounded-full   absolute bottom-[-5px] right-[-4px] ">
                  <img
                    src={user?.logoImg}
                    alt="logo"
                    className="h-[100%] w-[100%] rounded-full object-cover   shadow-md border-[2px] border-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] min-h-[150px] bg-[#eaf2fd] shadow-lg shadow-[#eaf2fd]">
          <div className="w-[100%] flex flex-col items-center">
            <h2 className="text-sm font-medium mt-[52px] ">{user?.name}</h2>
            <p className="text-[9px] mt-1  text-[#a8aeb6]">
            {user?.job} at {user?.company}
            </p>
            <p className="text-[9px] mt-1  text-[#a8aeb6]">{user?.location}</p>
            <div className="w-[90%]">
              <p className="text-[9px] mt-2 text-center text-[#a8aeb6] ">
              {user?.bio}
              </p>
            </div>
            <div
              className="h-[36px] w-[80%] rounded-3xl border mt-3 bg-[#2f80ed] flex justify-center items-center text-sm font-medium text-white cursor-pointer"
            //   style="background-color: rgb(235, 87, 87);"
            >
              Save Contact
            </div>
          </div>
        </div>
        <div className="w-[100%] grid grid-cols-3 gap-x-4 ">

      {singlelink.img &&  <div className="h-[70px] w-[70px]  flex flex-col items-center mt-5" style={checkAdded(singlelink?.name) ?{display:'none'}:null}>
<img
  src={singlelink.img}
  alt="social"
  className="h-[40px] w-[40px] "
/>
<p className="text-[11px] mt-1 font-medium">{singlelink?.name}</p>
</div>}


          {
            link?.map((elm)=>{
return <div className="h-[70px] w-[70px]  flex flex-col items-center mt-5" style={elm?.isHide===true ?{display:'none'}:null}>
<img
  src={returnIcons(elm?.title)}
  alt="social"
  className="h-[40px] w-[40px] "
/>
<p className="text-[11px] mt-1 font-medium">{elm?.name}</p>
</div>
            })
          }
          
  
        </div>
      </div>
    </div>
  );
};

export default Mobile;
