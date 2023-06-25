import React from "react";
import {MdOutlineKeyboardArrowDown} from 'react-icons/md'
import {RiArrowLeftSLine,RiArrowRightSLine} from 'react-icons/ri'

const Organization = () => {
  return (
    <div class="mt-[35px]">
      <div>
        <div class="w-[100%]  flex justify-between h-max">
          <div class="w-[30%]  h-[170px]">
            <div class="text-lg font-[500]">Organization Settings</div>
          </div>
          <div class="w-[60%] border h-[170px] rounded-md shadow-md p-5">
            <div>
              <p class="text-sm font-[500] mb-1">Organization Name</p>
              <input
                type="text"
                class="border outline-none w-[65%] h-[45px] rounded-md p-2  "
              />
            </div>
            <div class="mt-[16px] border-t flex items-center h-[60px]">
              <div class="flex justify-center items-center h-[38px] w-[75px] rounded-md bg-[#0b567f] text-white font-[500] cursor-pointer text-sm ">
                Save
              </div>
            </div>
          </div>
        </div>
        <div class="border mt-7"></div>
        <div class="w-[100%]  flex justify-between  mt-6 items-center ">
          <div class="w-[30%]  h-[210px]">
            <div class="text-lg font-[500]">Organization Account</div>
          </div>
          <div class="w-[60%] border rounded-md shadow-md  h-[210px] p-5">
            <div class="w-[100%] flex justify-between p-0">
              <div class="w-[30%] ">
                <h2 class="text-sm  font-[500]">Zain Ali</h2>
                <p class="text-sm text-gray-500 font-[500]">
                  zleo3883@gmail.com
                </p>
              </div>
              <div class="w-[40%]  flex justify-between items-center">
                <h2 class="text-sm text-gray-500 font-[500]">Administrator</h2>
                <div class="w-[130px] h-[40px] border rounded-md flex items-center justify-around text-gray-600 font-[500] text-sm hover:bg-gray-100 cursor-pointer">
                  Manage user{" "}
                  <MdOutlineKeyboardArrowDown className="text-xl"/>
                </div>
              </div>
            </div>
            <div class="w-[100%] mt-7">
              <div class="border h-[42px] text-sm w-[120px] flex justify-center items-center rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer font-[500]">
                Invite User
              </div>
            </div>
            <div class="w-[100%] flex justify-between mt-5">
              <div class="w-[55%]  flex justify-between items-center">
                {/* <div class="MuiFormControl-root css-1r4pjbh">
                  <label
                    class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeSmall MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeSmall MuiInputLabel-outlined css-cktaik"
                    data-shrink="false"
                    id="demo-simple-select-label"
                  >
                    User
                  </label>
                  <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl MuiInputBase-sizeSmall  css-fvipm8">
                    <div
                      tabindex="0"
                      role="button"
                      aria-expanded="false"
                      aria-haspopup="listbox"
                      aria-labelledby="demo-simple-select-label demo-simple-select"
                      id="demo-simple-select"
                      class="MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputSizeSmall css-182didf"
                    >
                      <span class="notranslate">​</span>
                    </div>
                    <input
                      aria-hidden="true"
                      tabindex="-1"
                      class="MuiSelect-nativeInput css-1k3x8v3"
                      value=""
                    />
                    <svg
                      class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSelect-icon MuiSelect-iconOutlined css-1636szt"
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      data-testid="ArrowDropDownIcon"
                    >
                      <path d="M7 10l5 5 5-5z"></path>
                    </svg>
                    <fieldset
                      aria-hidden="true"
                      class="MuiOutlinedInput-notchedOutline css-igs3ac"
                    >
                      <legend class="css-yjsfm1">
                        <span>Age</span>
                      </legend>
                    </fieldset>
                  </div>
                </div> */}
                <h2 class="text-sm text-gray-500 font-[500]">
                  Showing 1 to 1 of 1 results
                </h2>
              </div>
              <div class="w-[20%] border rounded-md flex">
                <div class="w-[33%] h-[100%] flex justify-center items-center ">
                  <RiArrowLeftSLine className="text-xl"/>
                </div>
                <div class="w-[34%] h-[100%] flex justify-center items-center border">
                  1
                </div>
                <div class="w-[33%] h-[100%] flex justify-center items-center ">
                  <RiArrowRightSLine className="text-xl"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default Organization;
