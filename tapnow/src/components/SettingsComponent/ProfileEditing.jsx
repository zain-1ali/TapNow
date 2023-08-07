import { Switch } from "@mui/material";
import { onValue, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../Firebase";
import { useNavigate } from "react-router-dom";

const ProfileEditing = ({ user }) => {
  let navigate = useNavigate();

  console.log(user);

  let handleChange = (value) => {
    update(ref(db, `User/${user?.id}/`), { allowTeamLogin: !value }).then(
      () => {
        // navigate('/settings')
      }
    );
  };
  return (
    <div class="mt-[35px]">
      <div>
        <div class="w-[100%]  lg:flex justify-between  mt-6 items-center">
          <div class="lg:w-[30%] w-[90%]  ">
            <div class="text-lg font-[500]">Employee editing access</div>
            <p className="text-sm mt-1">
              Grant employees access to edit their own profiles within the Tap
              Now app
            </p>
          </div>
          <div class="lg:w-[60%] w-[90%] lg:mt-0 mt-5 border rounded-md shadow-md flex items-center h-[80px] p-5 justify-between">
            <p class="text-sm leading-5 font-medium text-gray-900">
              Grant all employees profile editing access
            </p>
            <Switch
              checked={user?.allowTeamLogin}
              size="small"
              onChange={() => handleChange(user?.allowTeamLogin)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditing;
