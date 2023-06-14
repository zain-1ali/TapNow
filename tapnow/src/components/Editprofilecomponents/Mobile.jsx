import React from "react";
import {BiSignal4} from 'react-icons/bi'
import {AiOutlineWifi} from 'react-icons/ai'

const Mobile = () => {
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
              src="https://firebasestorage.googleapis.com/v0/b/tap-now-ae13b.appspot.com/o/1686130659502szZBjgVlYHcnTHFRIn3qiHl40sJ3?alt=media&amp;token=fe89883f-8d52-433d-90fc-b29bcbf84a3a"
              alt=""
              className="w-[100%] h-[90px] object-cover "
            />
            <div className="  absolute  left-[30%] top-[37px]">
              <div className="h-[95px] w-[95px] rounded-full   border-[5px] border-white relative ">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/tap-now-ae13b.appspot.com/o/1686130659493szZBjgVlYHcnTHFRIn3qiHl40sJ3?alt=media&amp;token=d079d68e-7dd6-4439-937c-d763d5172e1d"
                  alt=""
                  className="h-[100%] w-[100%] rounded-full "
                />
                <div className="h-[35px] w-[35px] rounded-full   absolute bottom-[-5px] right-[-4px] ">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/tap-now-ae13b.appspot.com/o/1686124129211szZBjgVlYHcnTHFRIn3qiHl40sJ3?alt=media&amp;token=e6635e4e-7ad0-4a81-9031-d3cf74106f05"
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
            <h2 className="text-sm font-medium mt-[52px] ">zain Ali</h2>
            <p className="text-[9px] mt-1  text-[#a8aeb6]">
              Full Stack Developer at Aviccena Enterprises
            </p>
            <p className="text-[9px] mt-1  text-[#a8aeb6]">Dharampura Lahore</p>
            <div className="w-[90%]">
              <p className="text-[9px] mt-2 text-center text-[#a8aeb6] ">
                This is Zain Ali , A full stack developer . Working as full
                stack developer from past 6 months . My future plans are to
                discover AI and Blockchain development.
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
          <div className="h-[70px] w-[70px]  flex flex-col items-center mt-5">
            <img
              src="/assets/email-79d91537.png"
              alt="social"
              className="h-[40px] w-[40px] "
            />
            <p className="text-[11px] mt-1 font-medium">Email</p>
          </div>
          <div className="h-[70px] w-[70px]  flex flex-col items-center mt-5">
            <img
              src="/assets/instagram-d0e16663.png"
              alt="social"
              className="h-[40px] w-[40px] "
            />
            <p className="text-[11px] mt-1 font-medium">Instagram</p>
          </div>
          <div className="h-[70px] w-[70px]  flex flex-col items-center mt-5">
            <img
              src="/assets/text-a759f6fc.png"
              alt="social"
              className="h-[40px] w-[40px] "
            />
            <p className="text-[11px] mt-1 font-medium">Text</p>
          </div>
          <div className="h-[70px] w-[70px]  flex flex-col items-center mt-5">
            <img
              src="/assets/tiktok-11121b7a.png"
              alt="social"
              className="h-[40px] w-[40px] "
            />
            <p className="text-[11px] mt-1 font-medium">Tiktok</p>
          </div>
          <div className="h-[70px] w-[70px]  flex flex-col items-center mt-5">
            <img
              src="/assets/whatsapp-08e7d5c9.png"
              alt="social"
              className="h-[40px] w-[40px] "
            />
            <p className="text-[11px] mt-1 font-medium">Whatsapp</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mobile;
