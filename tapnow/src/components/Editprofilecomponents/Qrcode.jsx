import React, { useState } from "react";
import { BiDownload } from "react-icons/bi";
import { BsFillWalletFill } from "react-icons/bs";
import { IoMdColorFilter } from "react-icons/io";
import { MdAddCircleOutline } from "react-icons/md";
import Cropper from "./Cropper";
import { useSelector, useDispatch } from "react-redux";
import { setQrLogo, setQrColor } from "../../Redux/UserinfoSlice";
import { ref, update } from "firebase/database";
import { db, storage } from "../../Firebase";
import { uploadString, ref as sRef, getDownloadURL } from "firebase/storage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { QRCode } from "react-qrcode-logo";
import { useMediaQuery } from "react-responsive";

const Qrcode = ({ user }) => {
  const name = useSelector((state) => state.userInfoHandeler.userInfo.name);
  const qrLogo = useSelector((state) => state.userInfoHandeler.userInfo.qrLogo);
  const qrColor = useSelector(
    (state) => state.userInfoHandeler.userInfo.qrColor
  );

  let dispatch = useDispatch();
  console.log(qrColor);

  // ----------------------------------------------------State setup for LOGO img crop---------------------------------------------

  let [logoimg, setlogoimg] = useState(null);
  let [cropModal, setcropModal] = useState(false);
  let [mylogoimg, setmylogoimg] = useState(null);
  let [croplogo, setCroplogo] = useState({
    unit: "%",
    x: 50,
    y: 50,
    width: 25,
    height: 25,
  });

  let handleclosecropper = () => {
    setcropModal(false);
  };

  let handlelogoImageChange = (event) => {
    // profileImage
    setlogoimg("");
    const { files } = event.target;

    // setKey(key + 1);
    if (files && files?.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener("load", () => {
        setlogoimg(reader.result);
        // dispatch(setProfileImg(reader.result))

        setcropModal(true);
      });
    }
  };

  const addData = async () => {
    if (qrColor || qrLogo) {
      update(ref(db, `User/${user?.id}`), { qrColor }).then(() => {
        toast.success("Information updated successfuly");
      });
      if (logoimg) {
        let name = new Date().getTime() + user?.id;
        const storageRef = sRef(storage, name);
        uploadString(storageRef, qrLogo.slice(23), "base64", {
          contentType: "image/png",
        })
          .then(() => {
            console.log("img testing");
            getDownloadURL(storageRef)
              .then((URL) => {
                // console.log(URL)
                update(ref(db, `User/${user?.id}`), { qrLogo: URL });
                setlogoimg("");
                // window.location.reload();
              })
              .catch((error) => {
                console.log(error);
              });
            // setimg(null)
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  let profileUrl = "https://tapnowprofile.link2avicenna.com/";

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  return (
    <div class="laptop:w-[530px] w-[100%] p-5 relative">
      {/* --------------------------------------------croper for logo image------------------------------------------------  */}

      <Cropper
        cropModal={cropModal}
        handleclosecropper={handleclosecropper}
        theimg={logoimg}
        myimg={mylogoimg}
        setmyimg={setmylogoimg}
        setcrop={setCroplogo}
        crop={croplogo}
        aspect={1 / 1}
        setReduxState={setQrLogo}
      />
      <div class="flex justify-between ">
        <h2 class="font-medium">Qr Code</h2>
        <div class="flex justify-end  w-[76%] ">
          <div class="w-[65%] laptop:w-[55%] flex items-center justify-center border rounded-3xl h-[35px] cursor-pointer">
            {/* <svg
              class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="FileDownloadOutlinedIcon"
            >
              <path d="M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2zm-1-4-1.41-1.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5z"></path>
            </svg> */}
            <BiDownload class="text-xl" />
            <p class="text-xs font-medium ml-2">Download Qr Code</p>
          </div>
          {/* <div class="w-[40%] flex items-center justify-center border rounded-3xl h-[35px] cursor-pointer">
            
            <BsFillWalletFill class='text-lg'/>
            <p class="text-xs font-medium ml-2">Add to Wallet</p>
          </div> */}
        </div>
      </div>
      {isTabletOrMobile && (
        <div class="mt-[10px] w-[100%] flex justify-center">
          <QRCode
            value={profileUrl}
            size="100"
            logoImage={qrLogo}
            fgColor={qrColor ? qrColor : "black"}
            logoOpacity="0.6"
            logoWidth="40"
            logoHeight="40"
          />
          {/* import.meta.env.VITE_PROFILE_URL */}
          <div style={{ display: "none" }}>
            {/* <QRCode
            value={profileUrl + user?.userName}
            size="200"
            fgColor={qrColor ? qrColor : "black"}
            logoOpacity="0.5"
            logoWidth="90"
            logoHeight="90"
            ref={qrCodeRef}
            id="qrCodeEl"
          /> */}
            {/* import.meta.env.VITE_PROFILE_URL */}
          </div>
        </div>
      )}
      <div class="w-[100%] laptop:mt-10 mt-[10px]">
        <h2 class="text-sm font-medium">Chose Color</h2>
        <div class="laptop:w-[80%] w-[80%] flex justify-around mt-3">
          <label for="qrcolor">
            <div class="h-[26px] w-[26px] rounded-full border flex justify-center items-center cursor-pointer ">
              {/* <svg
                class="MuiSvgIcon-root MuiSvgIcon-fontSize15px css-jpbqk9"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="ColorizeOutlinedIcon"
              >
                <path d="m17.66 5.41.92.92-2.69 2.69-.92-.92 2.69-2.69M17.67 3c-.26 0-.51.1-.71.29l-3.12 3.12-1.93-1.91-1.41 1.41 1.42 1.42L3 16.25V21h4.75l8.92-8.92 1.42 1.42 1.41-1.41-1.92-1.92 3.12-3.12c.4-.4.4-1.03.01-1.42l-2.34-2.34c-.2-.19-.45-.29-.7-.29zM6.92 19 5 17.08l8.06-8.06 1.92 1.92L6.92 19z"></path>
              </svg> */}
              <IoMdColorFilter class="text-lg" />
            </div>
            <input
              type="color"
              name="qrcolor"
              id="qrcolor"
              class="opacity-0 w-[0px] h-[0px]"
              onChange={(e) => dispatch(setQrColor(e.target.value))}
            />
          </label>
          <div
            class="h-[26px] w-[26px] rounded-full  flex justify-center items-center cursor-pointer bg-[#000000]"
            onClick={() => dispatch(setQrColor("#000000"))}
          ></div>
          <div
            class="h-[26px] w-[26px] rounded-full  flex justify-center items-center cursor-pointer bg-[#eb5757]"
            onClick={() => dispatch(setQrColor("#eb5757"))}
          ></div>
          <div
            class="h-[26px] w-[26px] rounded-full  flex justify-center items-center cursor-pointer bg-[#f2994a]"
            onClick={() => dispatch(setQrColor("#f2994a"))}
          ></div>
          <div
            class="h-[26px] w-[26px] rounded-full  flex justify-center items-center cursor-pointer bg-[#219653]"
            onClick={() => dispatch(setQrColor("#219653"))}
          ></div>
          <div
            class="h-[26px] w-[26px] rounded-full  flex justify-center items-center cursor-pointer bg-[#2f80ed]"
            onClick={() => dispatch(setQrColor("#2f80ed"))}
          ></div>
          <div
            class="h-[26px] w-[26px] rounded-full  flex justify-center items-center cursor-pointer bg-[#9b51e0]"
            onClick={() => dispatch(setQrColor("#9b51e0"))}
          ></div>
        </div>
      </div>
      <div class="w-[100%] laptop:mt-10 mt-[20px]">
        <h2 class="text-sm font-medium">Custom logo</h2>
        <div class="flex items-center h-[100px] w-[100%]  mt-3">
          <div class="h-[90px] w-[90px] relative">
            <label
              for="qrimg"
              class="absolute right-[-4px] top-[-6px] cursor-pointer"
            >
              {/* <svg
                class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="ControlPointOutlinedIcon"
              >
                <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
              </svg> */}
              <MdAddCircleOutline className="text-2xl" />
              <input
                type="file"
                name="qrimg"
                id="qrimg"
                class="opacity-0 w-[0px] h-[0px]"
                onChange={handlelogoImageChange}
              />
            </label>
            <img
              src={qrLogo ? qrLogo : "https://placehold.co/80x80"}
              alt="profile"
              class="h-[80px] w-[80px] rounded-xl"
            />
          </div>

          <p class="text-sm font-medium ml-3 w-[70%] laptop:w-[80%]">
            Add custom logo to be displayed in the middle of the Qr Code.
          </p>
        </div>
      </div>

      <div class="w-[95%] h-[70px]  laptop:absolute laptop:bottom-[30px]  laptop:right-[20px] flex flex-row-reverse ">
        <div
          class="flex justify-end items-center w-[250px]"
          onClick={() => addData()}
        >
          <div class="h-[40px] w-[120px] border rounded-3xl mr-2 bg-[#0b567f] flex items-center justify-center cursor-pointer">
            <p class="text-sm font-medium ml-[3px] text-white">Update</p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Qrcode;
