import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {HiOutlineInformationCircle} from 'react-icons/hi'
import {AiOutlineSearch} from 'react-icons/ai'

const Contact = () => {

    let [selectVal,setselectVal]=useState('')

let handleChange=()=>{

}

  return (
    <div class="w-[100%] min-h-[100vh] flex">
        <Sidebar/>
        <div class='w-[85%] h-[100%]'>
      <div class=" w-[100%] h-[100px] mt-[35px] flex justify-center">
        <div class="w-[93%] flex justify-between ">
          <h2 class="text-4xl font-[500]">Contacts</h2>
        </div>
      </div>
      <div class="flex w-[100%]  justify-center">
        <div class="w-[94%] flex justify-between ">
          <div class="w-[420px] h-[120px] rounded-md bg-[#b2d9ee] flex justify-center items-center">
            <div class="w-[90%] h-[85%] ">
              <div class="w-[100%] flex ">
                <div>
                  <HiOutlineInformationCircle class="text-xl mt-[2px]"/>
                </div>
                <p class="ml-[12px] font-[500]">
                  Ensure you have enabled contact exchange
                </p>
              </div>
              <p class="ml-[30px] mt-1 text-gray-500">
                These are the contacts you have received if contact exchange is
                enabled on your profile.
              </p>
              <div class=" w-[115px] ml-[30px] cursor-pointer flex justify-between font-[500] text-[#0b567f] items-center">
                Learn more{" "}
                <div>
                  <svg
                    class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="ArrowRightAltOutlinedIcon"
                  >
                    <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="w-[320px]  relative mr-5">
            <div class="ml-[10px] border h-[40px] rounded-md w-[140px] flex justify-center items-center text-gray-700 hover:bg-gray-100 cursor-pointer absolute right-0 top-[28px] font-[500]">
              Export via CSV
            </div>
            <div class="flex w-[320px]  absolute bottom-0">
              <div class="  border h-[42px] rounded-md w-[210px] flex justify-center items-center">
              <AiOutlineSearch className="text-gray-500 text-lg ml-2"/>
                <input
                  type="text"
                  placeholder="Search..."
                  class="border-none outline-none ml-2 w-[150px]"
                />
              </div>
              <div className="ml-[10px]">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectVal}
                  label="Age"
                  style={{ width: "150px", height: "40px" }}
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Newest</MenuItem>
                  <MenuItem value={20}>Oldest</MenuItem>
                  <MenuItem value={30}>A tO Z</MenuItem>
                  <MenuItem value={40}>Z tO A</MenuItem>

                </Select>
              </FormControl>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-[100%] h-[300px] flex flex-col items-center justify-center">
        <h2 class="text-2xl font-[500]">No results</h2>
        <p class="text-gray-500 mt-3 flex">
          You can activate a lead-generation form on the card profile settings.
          Contacts collected via that form will be stored here.{" "}
          <h2 class="font-[500] text-[#0b567f] cursor-pointer">Learn more.</h2>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Contact;
