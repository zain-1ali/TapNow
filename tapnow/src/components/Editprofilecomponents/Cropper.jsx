import { Box, Modal } from '@mui/material'
import React from 'react'
import { ReactCrop } from 'react-image-crop';
import { useDispatch } from 'react-redux';

const Cropper = ({cropModal,handleclosecropper,theimg,myimg,setmyimg,setcrop,crop,aspect,setReduxState}) => {


let dispatch=useDispatch()
   

    const getProfileCropImage = async () => {
        const canvas = document.createElement('canvas');
        const scaleX = myimg.naturalWidth / myimg.width;
        const scaleY = myimg.naturalHeight / myimg.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
    
        const pixelRatio = window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';
    
        ctx.drawImage(
          myimg,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height,
        );
    
        // Converting to base64
        const base64Image = canvas.toDataURL('image/jpeg');
        // setprofileImagePath(base64Image)
        dispatch(setReduxState(base64Image))
    
        // setOutput(base64Image);
        // setsaveImageIcon(true)
        handleclosecropper()
    
      }


      const style2 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        // height: 'max',
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 2,
      };


  return (
    <>
<Modal
                  open={cropModal}
                  onClose={handleclosecropper}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style2}>
                    <ReactCrop crop={crop} onChange={(c) => { setcrop(c) }}  aspect={aspect} >
                      <img src={theimg} alt="img" onLoad={(e) => setmyimg(e.target)} />
                    </ReactCrop>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>


                      <button onClick={() => getProfileCropImage()} style={{ backgroundColor: 'black', outline: "none", marginRight: '10px', border: 'none', color: 'white', height: '35px', width: '70px', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
                      {/* saveImageInDb */}
                      <button onClick={() => handleclosecropper()} style={{ backgroundColor: 'black', outline: "none", marginLeft: '10px', border: 'none', color: 'white', height: '35px', width: '70px', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </Box>
                </Modal >
    </>
  )
}

export default Cropper