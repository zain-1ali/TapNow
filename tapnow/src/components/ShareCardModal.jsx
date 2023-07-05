import { Box, Modal } from '@mui/material'
import React from 'react'
import { BiCopy } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import {
    EmailShareButton,
    FacebookMessengerShareButton,
    FacebookShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    ViberShareButton,
    WhatsappShareButton,
  } from "react-share";
  import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    PinterestIcon,
    RedditIcon,
    TelegramIcon,
    TwitterIcon,
    ViberIcon,
    WhatsappIcon,
  } from "react-share";
  import Tooltip from '@mui/material/Tooltip';

const ShareCardModal = ({shareModal,handleShareModal,url}) => {


    const style2 = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 270,
        height: 280,
        bgcolor: "white",
        borderRadius:'18px',
        // overflow: 'auto',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 1
      };

     let quote ='Please find my Profile Link below:'




  return (

    <div>
<Modal
        open={shareModal}
        onClose={() => handleShareModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
            <div className='w-[100%] flex justify-center flex-col items-center'>
            <div className='w-[98%] flex justify-end '> 
    <RxCross2 className="text-black cursor-pointer" onClick={() =>handleShareModal()}/>
    </div>
<h2 className='text-lg font-medium'>Share To</h2>
            
<div className="w-[90%] grid grid-cols-3 gap-x-3 gap-y-5 ml-[14px] mt-2">
<Tooltip title="Copy to Clipboard" placement="top-start">
<div className=' flex justify-center items-center flex-col'>

  <BiCopy className='text-[45px] cursor-pointer active:text-[#0b567f] active:text-[40px]' onClick={() => {
         navigator.clipboard.writeText(url)}}/>
{/* <div className='text-[10px]'>Copy url</div> */}
</div>
</Tooltip>

<div>
<WhatsappShareButton id='whatsapp' url={quote + "\n" + url} text={"Please find my Profile Link below:"} hashtag="#React">
              <WhatsappIcon size={50} round={true} />
            </WhatsappShareButton>
</div>


<div>
<TelegramShareButton id='telegram' url={quote + "\n" + url} text={quote} hashtag="#React">
              <TelegramIcon size={50} round={true} />
            </TelegramShareButton>
</div>


<div>
<FacebookShareButton id='facebook' url={quote + "\n" + url} text={quote} hashtag="#React" >
              <FacebookIcon size={50} round={true} />
            </FacebookShareButton>
</div>

<div>
<EmailShareButton id='Email' url={quote + "\n" + url} text={quote} hashtag="#React">
              <EmailIcon size={50} round={true} />
            </EmailShareButton>
</div>



<div>
<PinterestShareButton id='pinterest' url={quote + "\n" + url} text={quote} hashtag="#React">
              <PinterestIcon size={50} round={true} />
            </PinterestShareButton>
</div>





<div>
<LinkedinShareButton id='linkedin' url={quote + "\n" + url} text={quote} hashtag="#React">
              <LinkedinIcon size={50} round={true} />
            </LinkedinShareButton>
</div>



{/* <div>
<FacebookMessengerShareButton id='fbMessenger' url={quote + "\n" + url} text={quote} hashtag="#React">
              <FacebookMessengerIcon size={50} round={true} />
            </FacebookMessengerShareButton>
</div> */}



<div>
<TwitterShareButton id='twitter' url={quote + "\n" + url} text={quote} hashtag="#React">
              <TwitterIcon size={50} round={true} />
            </TwitterShareButton>
</div>


<div>
<RedditShareButton id='reddit' url={quote + "\n" + url} text={quote} hashtag="#React">
              <RedditIcon size={50} round={true} />
            </RedditShareButton>
</div>


</div>
</div>
        </Box>
        </Modal>
    </div>
  )
}

export default ShareCardModal