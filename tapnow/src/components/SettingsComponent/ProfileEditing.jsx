import { Switch } from "@mui/material";
import { onValue, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../Firebase";

const ProfileEditing = ({user}) => {



console.log(user)

let handleChange = (title, value) => {
  update(ref(db, `User/${user?.id}/`), { allowTeamLogin: !value });
};


  return (
    <div class="mt-[35px]">
      <div>
        <div class="w-[100%]  flex justify-between  mt-6 items-center">
          <div class="w-[30%]  ">
            <div class="text-lg font-[500]">Employee editing access</div>
            <p>
              Grant employees access to edit their own profiles within the Tapt
              app
            </p>
          </div>
          <div class="w-[60%] border rounded-md shadow-md flex items-center h-[80px] p-5 justify-between">
            <p class="text-sm leading-5 font-medium text-gray-900">
              Grant all employees profile editing access
            </p>
            <Switch
                // checked={user?.leadMode}
                // size="small"
                // onChange={() => handleChange()}
              />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditing;
