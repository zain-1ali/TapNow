import React , { useEffect, useRef } from "react";
import {BiDownload} from 'react-icons/bi'
import { QRCode } from 'react-qrcode-logo';
import { useSelector } from "react-redux";
import html2canvas from 'html2canvas';
// import QRCode from 'qrcode.react';
import { saveAs } from 'file-saver';


const Qrcontainer = ({user}) => {


  const qrLogo = useSelector((state) => state.userInfoHandeler.userInfo.qrLogo)
  const qrColor = useSelector((state) => state.userInfoHandeler.userInfo.qrColor)
  const qrCodeRef = useRef(null);


  // download QR code
  const downloadQRCode = () => {
    const qrCodeURL = document.getElementById('qrCodeEl')
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    console.log(qrCodeURL)
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = "QR_Code.png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  }


  // const downloadQRCode = () => {
  //   const canvas = document.getElementById('qr-code-with-logo');
  //   canvas.toBlob(function (blob) {
  //     saveAs(blob, 'qrcode.png');
  //   });
  // };

  return (
    <div class="h-[540px] rounded-r-xl bg-white w-[320px] mt-5 flex items-center flex-col p-4 shadow-xl">

      <h2 class="font-medium">{user?.name}'s Qr Code</h2>
      <div class="mt-[75px] " >
        
      
      
      <QRCode value={import.meta.env.VITE_PROFILE_URL+user?.userName} size='200' logoImage={qrLogo} fgColor={qrColor?qrColor:'black'} logoOpacity='0.6' logoWidth='90' logoHeight='90' />
      <div style={{display:'none'}}>
      <QRCode value={import.meta.env.VITE_PROFILE_URL+user?.userName} size='200'  fgColor={qrColor?qrColor:'black'} logoOpacity='0.5' logoWidth='90' logoHeight='90' ref={qrCodeRef} id="qrCodeEl" />
      </div>
      
    
      </div>
      <div class="h-[40px] w-[170px] border rounded-3xl flex justify-center items-center mt-4 cursor-pointer" onClick={()=>downloadQRCode()}>
        
<BiDownload class='text-lg'/>

        <p class="text-xs font-medium ml-2" >Download Qr Code</p>
        {/* onClick={()=>handleDownload()} */}
      </div>
    </div>
  );
};

export default Qrcontainer;
