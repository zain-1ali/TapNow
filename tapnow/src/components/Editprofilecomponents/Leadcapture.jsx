import React from "react";
// import {setLeadMode} from '../../Redux/UserinfoSlice'
import { useDispatch, useSelector } from "react-redux";
import { ref, update } from "firebase/database";
import { db } from "../../Firebase";
import { Switch } from "@mui/material";
import {setFormHeader} from '../../Redux/UserinfoSlice'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

const Leadcapture = ({user}) => {
  const formHeader = useSelector((state) => state.userInfoHandeler.userInfo.formHeader)

  let handleChangeLead = () => {
    update(ref(db, `User/${user?.id}`), { leadMode: !user?.leadMode });
  };

  let handleChangename = () => {
if(user?.leadForm?.company===false && user?.leadForm?.job===false && user?.leadForm?.email===false && user?.leadForm?.company===false && user?.leadForm?.note===false && user?.leadForm?.phone===false){
  toast.warning('Form should not be empty')

}
else{
  update(ref(db, `User/${user?.id}/leadForm`), { Fname: !user?.leadForm?.Fname });

}

  };

  let handleChangecompany = () => {
    if(user?.leadForm?.Fname===false && user?.leadForm?.job===false && user?.leadForm?.email===false && user?.leadForm?.company===false && user?.leadForm?.note===false && user?.leadForm?.phone===false){
      toast.warning('Form should not be empty')
    
    }else{
      update(ref(db, `User/${user?.id}/leadForm`), { company: !user?.leadForm?.company });

    }
  };

  let handleChangejob = () => {
    if(user?.leadForm?.Fname===false && user?.leadForm?.company===false && user?.leadForm?.email===false && user?.leadForm?.company===false && user?.leadForm?.note===false && user?.leadForm?.phone===false){
      toast.warning('Form should not be empty')
    
    }else{
      update(ref(db, `User/${user?.id}/leadForm`), { job: !user?.leadForm?.job });
    }
  };

  let handleChangeemail = () => {
    if(user?.leadForm?.Fname===false && user?.leadForm?.company===false && user?.leadForm?.job===false && user?.leadForm?.company===false && user?.leadForm?.note===false && user?.leadForm?.phone===false){
      toast.warning('Form should not be empty')
    
    }else{
      update(ref(db, `User/${user?.id}/leadForm`), { email: !user?.leadForm?.email });

    }


  };

  let handleChangenote = () => {

    if(user?.leadForm?.Fname===false && user?.leadForm?.company===false && user?.leadForm?.job===false && user?.leadForm?.company===false && user?.leadForm?.email===false && user?.leadForm?.phone===false){
      toast.warning('Form should not be empty')
    
    }else{
      update(ref(db, `User/${user?.id}/leadForm`), {note: !user?.leadForm?.note });
    }


  };

  let handleChangephone = () => {
    if(user?.leadForm?.Fname===false && user?.leadForm?.company===false && user?.leadForm?.job===false && user?.leadForm?.company===false && user?.leadForm?.email===false){
      toast.warning('Form should not be empty')
    
    }else{
      update(ref(db, `User/${user?.id}/leadForm`), { phone: !user?.leadForm?.phone });

    }
  };



  let dispatch=useDispatch()




  const addData = async () => {
    // if (qrColor || qrLogo) {
        update(ref(db, `User/${user?.id}`), { formHeader }).then(()=>{
            toast.success('Information updated successfuly')
        });
             
    // }
}

  return (
    <div class="p-5 w-[100%] h-[100%] border ">
      <div class=" w-[100%] h-[50px] flex items-center">
        <h2 class="font-medium">Lead Capture Mode</h2>
      </div>
      <div class="overflow-y-scroll h-[350px] scrollbar-hide">
        <div class="w-[100%] flex items-center justify-between mt-2">
          <p class="text-xs font-medium w-[70%]">
            When lead capture mode is enabled, the lead form will popup as soon
            as your profile is shared
          </p>
          <Switch
                checked={user?.leadMode}
               
                onChange={() => handleChangeLead()}
              />
        </div>
        <div class=" w-[100%] mt-5">
          <h2 class="text-xs font-medium">Form Header</h2>
          <input
            type="text"
            placeholder="Form Header"
            class="mt-2 outline-none border-none w-[100%] h-[45px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
            onChange={(e)=>dispatch(setFormHeader(e.target.value))}
            value={formHeader}
          />
        </div>
        <div class="w-[100%] text-sm font-medium mt-[30px]  h-[30px] ">
          Input Fields
        </div>
        <div class="overflow-y-scroll h-[350px] scrollbar-hide mt-[50px]">
          <div class="mt-2  w-[100%] h-[45px] bg-[#f7f7f7] rounded-lg p-5 flex  items-center justify-between text-gray-400 text-sm">
            Full Name
            <div class="h-[35px] w-[110px] bg-white rounded-3xl border text-xs flex justify-center items-center">
              <p class="mr-[2px]">Require</p>
              <Switch
                checked={user?.leadForm?.Fname}
               size="small"
                onChange={() => handleChangename()}
              />
            </div>
          </div>
          <div class="mt-2  w-[100%] h-[45px] bg-[#f7f7f7] rounded-lg p-5 flex  items-center justify-between text-gray-400 text-sm">
            Email
            <div class="h-[35px] w-[110px] bg-white rounded-3xl border text-xs flex justify-center items-center">
              <p class="mr-[2px]">Require</p>
              
              <Switch
                checked={user?.leadForm?.email}
               size="small"
                onChange={() => handleChangeemail()}
              />
            </div>
          </div>
          <div class="mt-2  w-[100%] h-[45px] bg-[#f7f7f7] rounded-lg p-5 flex  items-center justify-between text-gray-400 text-sm">
            Phone Number
            <div class="h-[35px] w-[110px] bg-white rounded-3xl border text-xs flex justify-center items-center">
              <p class="mr-[2px]">Require</p>
            
              <Switch
                checked={user?.leadForm?.phone}
               size="small"
                onChange={() => handleChangephone()}
              />
            </div>
          </div>
          <div class="mt-2  w-[100%] h-[45px] bg-[#f7f7f7] rounded-lg p-5 flex  items-center justify-between text-gray-400 text-sm">
            Job Title
            <div class="h-[35px] w-[110px] bg-white rounded-3xl border text-xs flex justify-center items-center">
              <p class="mr-[2px]">Require</p>
              
              <Switch
                checked={user?.leadForm?.job}
               size="small"
                onChange={() => handleChangejob()}
              />
            </div>
          </div>
          <div class="mt-2  w-[100%] h-[45px] bg-[#f7f7f7] rounded-lg p-5 flex  items-center justify-between text-gray-400 text-sm">
            Company
            <div class="h-[35px] w-[110px] bg-white rounded-3xl border text-xs flex justify-center items-center">
              <p class="mr-[2px]">Require</p>

              <Switch
                checked={user?.leadForm?.company}
               size="small"
                onChange={() => handleChangecompany()}
              />
            </div>
          </div>
          <div class="mt-2  w-[100%] h-[45px] bg-[#f7f7f7] rounded-lg p-5 flex  items-center justify-between text-gray-400 text-sm">
            Note
            <div class="h-[35px] w-[110px] bg-white rounded-3xl border text-xs flex justify-center items-center">
              <p class="mr-[2px]">Require</p>
            
              <Switch
                checked={user?.leadForm?.note}
               size="small"
                onChange={() => handleChangenote()}
              />
            </div>
          </div>
        </div>
      </div>
      <div class="w-[100%] flex justify-end mt-[35px]" onClick={()=>addData()}>
        <div class="h-[40px] w-[120px] border rounded-3xl mr-2 bg-[#0b567f] flex items-center justify-center cursor-pointer">
          <p class="text-sm font-medium ml-[3px] text-white">Update</p>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />

    </div>
  );
};

export default Leadcapture;
