import React, { useEffect, useState } from "react";
import { BsFillHddStackFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { BsQrCode } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  openContent,
  openAbout,
  openQr,
  openLead,
} from "../../Redux/Profileeditslice";
import Content from "./Content";
import { onValue, ref, set } from "firebase/database";
import { db } from "../../Firebase";
import Mobilecontainer from "./Mobilecontainer";
import About from "./About";
import Qrcode from "./Qrcode";
import Leadcapture from "./Leadcapture";
import {
  setName,
  setBio,
  setColor,
  setCompany,
  setJob,
  setLocation,
  setProfileImg,
  setlogoImg,
  setBgImg,
} from "../../Redux/UserinfoSlice";
import Qrcontainer from "./Qrcontainer";
import { setQrLogo, setQrColor } from "../../Redux/UserinfoSlice";
import { setFormHeader } from "../../Redux/UserinfoSlice";
import { Addlinks } from "../../Redux/LinksSlice";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import styled from "@emotion/styled";
import ProfileCompleteModal from "../ProfileCompleteModal";
import { useMediaQuery } from "react-responsive";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme?.palette?.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme?.palette?.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const Editcard = ({ userID }) => {
  const iscontent = useSelector((state) => state.profileEditHandeler.isContent);
  const isabout = useSelector((state) => state.profileEditHandeler.isAbout);
  const isqr = useSelector((state) => state.profileEditHandeler.isQr);
  const islead = useSelector((state) => state.profileEditHandeler.isLead);

  const dispatch = useDispatch();

  let [user, setuser] = useState({});
  let [link, setlink] = useState([]);
  let [steps, setSteps] = useState(0);

  useEffect(() => {
    dispatch(setName(user?.name));
    dispatch(setLocation(user?.location));
    dispatch(setCompany(user?.company));
    dispatch(setJob(user?.job));
    dispatch(setColor(user?.colorCode));
    dispatch(setBio(user?.bio));
    dispatch(setProfileImg(user?.profileUrl));
    dispatch(setlogoImg(user?.logoImg));
    dispatch(setBgImg(user?.bgImg));
    dispatch(setQrColor(user?.qrColor));
    dispatch(setQrLogo(user?.qrLogo));
    dispatch(setFormHeader(user?.formHeader));
  }, [user]);

  // --------------------------geting the user data from firebase------------------------

  useEffect(() => {
    let getingdata = async () => {
      const starCountRef = ref(db, `/User/${userID}`);
      onValue(starCountRef, async (snapshot) => {
        const data = await snapshot.val();
        //  console.log(data)
        // MediaKeyStatusMap
        setuser(data);
        setlink(Object.values(data?.links));
        dispatch(Addlinks(Object.values(data?.links)));

        // updateStarCount(postElement, data);
      });
    };

    getingdata();
  }, []);

  useEffect(() => {
    setSteps(0);
    // console.log(user.logoImg);
    // if (user?.profileUrl) {
    //   setSteps(steps + 20);
    // }
    // if (user?.logoImg) {
    //   setSteps(steps + 20);
    // }
    // user?.profileUrl ? setSteps(steps + 20) : null;
    // user?.logoImg ? setSteps(steps + 20) : null;
    if (user?.profileUrl) {
      setSteps((prevSteps) => prevSteps + 20);
    }
    if (user?.bgImg) {
      setSteps((prevSteps) => prevSteps + 20);
    }
    if (user?.logoImg) {
      setSteps((prevSteps) => prevSteps + 20);
    }
    if (user?.links) {
      setSteps((prevSteps) => prevSteps + 20);
    }
  }, [user]);

  console.log(user);
  let width = screen.width;

  let [prflCmpltModal, setprflCmpltModal] = useState(false);

  let handlePrflCmpltModal = () => {
    setprflCmpltModal(!prflCmpltModal);
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  return (
    <div className="flex">
      <ProfileCompleteModal
        prflCmpltModal={prflCmpltModal}
        handlePrflCmpltModal={handlePrflCmpltModal}
        user={user}
        link={link}
      />
      <div class="laptop:h-[540px]   laptop:w-[730px] w-[100%] 2xl:h-[740px] 2xl:w-[1000px] desktop:h-[1100px] desktop:w-[1700px]  bg-white laptop:rounded-l-2xl rounded-xl border mt-5 laptop:flex shadow-xl">
        <div class="laptop:w-[27%] w-[100%] border-b flex laptop:flex-col justify-evenly  border-r laptop:h-[100%] h-[70px] laptop:p-5">
          <div
            class="laptop:w-[160px] w-[70px]  flex laptop:flex-row flex-col  items-center justify-evenly laptop:justify-start  laptop:rounded-lg laptop:h-[40px] h-[70px]  hover:bg-[#b2d9ee] laptop:p-3 cursor-pointer laptop:mt-4"
            onClick={() => dispatch(openContent())}
            style={iscontent ? { backgroundColor: "#b2d9ee" } : null}
          >
            <BsFillHddStackFill className="text-[#0b567f]" />
            <p class=" laptop:ml-2 laptop:text-lg text-sm">Content</p>
          </div>
          <div
            class="laptop:w-[160px] w-[70px]  flex items-center laptop:flex-row flex-col justify-evenly laptop:justify-start  laptop:rounded-lg laptop:h-[40px] h-[70px]  hover:bg-[#b2d9ee] laptop:p-3 cursor-pointer laptop:mt-4"
            onClick={() => dispatch(openAbout())}
            style={isabout ? { backgroundColor: "#b2d9ee" } : null}
          >
            <BsFillPersonFill className="text-[#0b567f]" />
            <p class=" laptop:ml-2 laptop:text-lg text-sm">About</p>
          </div>
          <div
            class="laptop:w-[160px] w-[70px]  flex items-center laptop:flex-row flex-col justify-evenly laptop:justify-start laptop:rounded-lg laptop:h-[40px] h-[70px]  hover:bg-[#b2d9ee] laptop:p-3 cursor-pointer laptop:mt-4"
            onClick={() => dispatch(openQr())}
            style={isqr ? { backgroundColor: "#b2d9ee" } : null}
          >
            <BsQrCode className="text-[#0b567f]" />
            <p class=" laptop:ml-2 laptop:text-lg text-sm">Qr code</p>
          </div>
          <div
            class="laptop:w-[160px] w-[70px]  flex items-center laptop:flex-row flex-col justify-evenly laptop:justify-start laptop:rounded-lg laptop:h-[40px] h-[70px]  hover:bg-[#b2d9ee] laptop:p-3 cursor-pointer laptop:mt-4"
            onClick={() => dispatch(openLead())}
            style={islead ? { backgroundColor: "#b2d9ee" } : null}
          >
            <FiFilter className="text-[#0b567f]" />
            <p class=" laptop:ml-2 laptop:text-lg text-sm">Leads</p>
          </div>

          {isDesktopOrLaptop && (
            <div
              className="mt-[50px] cursor-pointer"
              onClick={() => handlePrflCmpltModal()}
            >
              <h2 className="text-sm font-medium">Complete Your Profile</h2>
              <BorderLinearProgress
                variant="determinate"
                value={steps}
                className="mt-2"
              />
              <h2 className="text-xs font-medium mt-1">{steps}% Completed</h2>
            </div>
          )}
        </div>

        {iscontent && <Content user={user} link={link} />}
        {isabout && <About user={user} link={link} />}
        {isqr && <Qrcode user={user} link={link} />}
        {islead && <Leadcapture user={user} link={link} />}
      </div>

      {/* {isqr ? (
        <Qrcontainer user={user} />
      ) : (
        <Mobilecontainer user={user} link={link} />
      )} */}
    </div>
  );
};

export default Editcard;
