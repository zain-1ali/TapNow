import React from "react";
import { useSelector } from "react-redux";

const LeadForm = ({ user }) => {
  const formHeader = useSelector(
    (state) => state.userInfoHandeler.userInfo.formHeader
  );

  return (
    <div class="w-[200px] bg-white min-h-[330px]  absolute z-10 shadow-xl rounded-2xl p-3 mt-12">
      {/* 2xl:h-[740px] 2xl:w-[1000px] desktop:h-[1100px] desktop:w-[1700px] */}
      <div class="w-[100%] flex justify-center border-b-2 text-xs text-center font-medium pb-2">
        {formHeader}
      </div>
      <div class="min-h-[200px] w-[100%] mt-4">
        {user?.leadForm?.Fname && (
          <div class="h-[30px] w-[100%] border mt-2 text-xs flex items-center pl-1 rounded-md">
            Full Name
          </div>
        )}
        {user?.leadForm?.email && (
          <div class="h-[30px] w-[100%] border mt-2 text-xs flex items-center pl-1 rounded-md">
            Email
          </div>
        )}
        {user?.leadForm?.phone && (
          <div class="h-[30px] w-[100%] border mt-2 text-xs flex items-center pl-1 rounded-md">
            Phone Number
          </div>
        )}
        {user?.leadForm?.job && (
          <div class="h-[30px] w-[100%] border mt-2 text-xs flex items-center pl-1 rounded-md">
            Job Title
          </div>
        )}
        {user?.leadForm?.company && (
          <div class="h-[30px] w-[100%] border mt-2 text-xs flex items-center pl-1 rounded-md">
            Company
          </div>
        )}
        {user?.leadForm?.note && (
          <div class="h-[30px] w-[100%] border mt-2 text-xs flex items-center pl-1 rounded-md">
            Note
          </div>
        )}
      </div>
      <div class=" w-[100%] flex justify-center mt-3 ">
        <div class="h-[30px] w-[40%] mr-2 bg-[#0b567f] flex justify-center items-center text-sm font-medium text-white rounded-2xl">
          Submit
        </div>
        <div class="h-[30px] w-[40%] ml-2 bg-[#0b567f] flex justify-center items-center text-sm font-medium text-white rounded-2xl">
          Cancel
        </div>
      </div>
    </div>
  );
};

export default LeadForm;
