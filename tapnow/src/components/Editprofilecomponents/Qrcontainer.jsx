import React from "react";
import {BiDownload} from 'react-icons/bi'
import { QRCode } from 'react-qrcode-logo';
import { useSelector } from "react-redux";



const Qrcontainer = ({user}) => {


  const qrLogo = useSelector((state) => state.userInfoHandeler.userInfo.qrLogo)
  const qrColor = useSelector((state) => state.userInfoHandeler.userInfo.qrColor)

  return (
    <div class="h-[540px] rounded-r-xl bg-white w-[320px] mt-5 flex items-center flex-col p-4 shadow-xl">

      <h2 class="font-medium">{user?.name}'s Qr Code</h2>
      <div class="mt-[75px] " >
        
      
      
      <QRCode value="https://github.com/gcoro/react-qrcode-logo" size='200' logoImage={qrLogo} fgColor={qrColor} logoOpacity='0.8' logoWidth='90' logoHeight='90'/>
      
        {/* <canvas
          id="react-qrcode-logo"
          height="200"
          width="200"

          style={{height: '200px',width: '200px'}}
        ></canvas> */}
      </div>
      <div class="h-[40px] w-[170px] border rounded-3xl flex justify-center items-center mt-4 cursor-pointer">
        {/* <svg
          class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="FileDownloadOutlinedIcon"
        >
          <path d="M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2zm-1-4-1.41-1.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5z"></path>
        </svg> */}
<BiDownload class='text-lg'/>

        <p class="text-xs font-medium ml-2">Download Qr Code</p>
      </div>
    </div>
  );
};

export default Qrcontainer;
