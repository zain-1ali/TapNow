import React, { useEffect, useState } from "react";
import {MdAddCircleOutline} from 'react-icons/md'
import {IoMdColorFilter} from 'react-icons/io'
import { setName,setBio,setColor,setCompany,setJob,setLocation,setProfileImg,setlogoImg,setBgImg } from '../../Redux/UserinfoSlice'
import { useDispatch, useSelector } from "react-redux";
import { ref, update } from "firebase/database";
import { db, storage } from "../../Firebase";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Cropper from "./Cropper";
import { uploadString , ref as sRef, getDownloadURL} from "firebase/storage";


const About = ({user,link}) => {

// ----------------------------------------------------State setup for profile img crop---------------------------------------------

    let [prflimg, setprflimg] = useState(null)
    let [cropModal, setcropModal] = useState(false)
    let [myprflimg, setmyprflimg] = useState(null)
    let [cropPrfl, setCropPrfl] = useState({
      unit: '%',
      x: 50,
      y: 50,
      width: 25,
      height: 25
    })


    let handleclosecropper = () => {
        setcropModal(false)
        // settheimg(null)
      }



      let handlePrflImageChange = (event) => {
        // profileImage
        setprflimg('')
        const { files } = event.target
    
        // setKey(key + 1);
        if (files && files?.length > 0) {
          const reader = new FileReader()
          reader.readAsDataURL(files[0])
          reader.addEventListener('load', () => {
            setprflimg(reader.result)
            // dispatch(setProfileImg(reader.result))
    
            setcropModal(true)
          })
        }
      }



// ----------------------------------------------------State setup for LOGO img crop---------------------------------------------

let [logoimg, setlogoimg] = useState(null)
// let [cropModal, setcropModal] = useState(false)
let [mylogoimg, setmylogoimg] = useState(null)
let [croplogo, setCroplogo] = useState({
  unit: '%',
  x: 50,
  y: 50,
  width: 25,
  height: 25
})


// let handleclosecropper = () => {
//     setcropModal(false)
    
//   }



  let handlelogoImageChange = (event) => {
    // profileImage
    setlogoimg('')
    const { files } = event.target

    // setKey(key + 1);
    if (files && files?.length > 0) {
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.addEventListener('load', () => {
        setlogoimg(reader.result)
        // dispatch(setProfileImg(reader.result))

        setcropModal(true)
      })
    }
  }

// ----------------------------------------------------State setup for bg img crop---------------------------------------------

let [bgimg, setbgimg] = useState(null)
// let [cropModal, setcropModal] = useState(false)
let [mybgimg, setmybgimg] = useState(null)
let [cropbg, setCropbg] = useState({
  unit: '%',
  x: 50,
  y: 50,
  width: 25,
  height: 25
})


// let handleclosecropper = () => {
//     setcropModal(false)
    
//   }



  let handlebgImageChange = (event) => {
    // profileImage
    setbgimg('')
    const { files } = event.target

    // setKey(key + 1);
    if (files && files?.length > 0) {
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.addEventListener('load', () => {
        setbgimg(reader.result)
        // dispatch(setProfileImg(reader.result))

        setcropModal(true)
      })
    }
  }



// ----------------------------------------------------State from redux---------------------------------------------

const name = useSelector((state) => state.userInfoHandeler.userInfo.name)
const location = useSelector((state) => state.userInfoHandeler.userInfo.location)
const job = useSelector((state) => state.userInfoHandeler.userInfo.job)
const company = useSelector((state) => state.userInfoHandeler.userInfo.company)
const bio = useSelector((state) => state.userInfoHandeler.userInfo.bio)
const colorCode = useSelector((state) => state.userInfoHandeler.userInfo.colorCode)
const profileUrl = useSelector((state) => state.userInfoHandeler.userInfo.profileUrl)
const logoImg = useSelector((state) => state.userInfoHandeler.userInfo.logoImg)
const bgImg = useSelector((state) => state.userInfoHandeler.userInfo.bgImg)




console.log(colorCode)



let dispatch=useDispatch()


useEffect(()=>{
    dispatch(setName(user?.name))
    dispatch(setLocation(user?.location))
    dispatch(setCompany(user?.company))
    dispatch(setJob(user?.job))
    dispatch(setColor(user?.colorCode))
    dispatch(setBio(user?.bio))
    dispatch(setProfileImg(user?.profileUrl))
    dispatch(setlogoImg(user?.logoImg))
    dispatch(setBgImg(user?.bgImg))


    
        },[user])

        console.log(name)
// let [data,setdata]=useState({
//     name:'',
//     location:'',
//     job:'',
//     company:'',
//     bio:''
// })



const addData = async () => {
    if (name || location || job || company || bio|| colorCode) {
        update(ref(db, `User/${user?.id}`), { name,location,colorCode,job,company,bio }).then(()=>{
            toast.success('Link added successfuly')
        });
        if (prflimg) {
            let name = new Date().getTime() + user?.id;
            const storageRef = sRef(storage, name);
            uploadString(storageRef, profileUrl.slice(23), "base64", {
                contentType: "image/png",
              }).then(() => {
                console.log('img testing')
                getDownloadURL(storageRef).then((URL) => {
                    // console.log(URL)
                    update(ref(db, `User/${user?.id}`), { profileUrl: URL });
                    setprflimg('')
                    // window.location.reload();

                }).catch((error) => {
                    console.log(error)
                });
                // setimg(null)
            }).catch((error) => {
                console.log(error)
            })
        }



        if (bgimg) {
          let name = new Date().getTime() + user?.id;
          const storageRef = sRef(storage, name);
          uploadString(storageRef, bgImg.slice(23), "base64", {
              contentType: "image/png",
            }).then(() => {
              console.log('img testing')
              getDownloadURL(storageRef).then((URL) => {
                  // console.log(URL)
                  update(ref(db, `User/${user?.id}`), { bgImg: URL });
                  setBgImg('')
                  // window.location.reload();

              }).catch((error) => {
                  console.log(error)
              });
              // setimg(null)
          }).catch((error) => {
              console.log(error)
          })
      }
      
    }
}




  return (
    <div className="w-[530px] h-[100%] p-4 relative">
      {/* --------------------------------------------croper for profile image------------------------------------------------  */}
        <Cropper cropModal={cropModal} handleclosecropper={handleclosecropper} theimg={prflimg} myimg={myprflimg} setmyimg={setmyprflimg} setcrop={setCropPrfl} crop={cropPrfl} aspect={1/1} setReduxState={setProfileImg}/>

     {/* --------------------------------------------croper for Cover image------------------------------------------------  */}
        <Cropper cropModal={cropModal} handleclosecropper={handleclosecropper} theimg={bgimg} myimg={mybgimg} setmyimg={setmybgimg} setcrop={setCropbg} crop={cropbg} aspect={4/2} setReduxState={setBgImg}/>

    {/* --------------------------------------------croper for Cover image------------------------------------------------  */}

    <Cropper cropModal={cropModal} handleclosecropper={handleclosecropper} theimg={logoimg} myimg={mylogoimg} setmyimg={setmylogoimg} setcrop={setCroplogo} crop={croplogo} aspect={1/1} setReduxState={setlogoImg}/>
      <div className="w-[100%] h-[80%] overflow-y-scroll scrollbar-hide">
        <div className="w-[100%]">
          <h2 className="text-xs font-medium">Card Title</h2>
          <input
            type="text"
            placeholder="Card Title"
            className="mt-2 outline-none border-none w-[220px] h-[40px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
          />
        </div>
        <div className="w-[100%] flex justify-around mt-[30px]">
          <div>
            <p className="font-medium text-xs text-center">Profile picture</p>
            <div className="h-[90px] w-[90px] rounded-full mt-2 relative ">
              <label
                for="img"
                className="absolute right-[0px] top-[-1px] cursor-pointer"
              >
                <MdAddCircleOutline className='text-2xl'/>
                
                <input
                  type="file"
                  name="img"
                  id="img"
                  className="opacity-0 w-[0px] h-[0px]"
                  onChange={handlePrflImageChange}
                //   onChange={()=> dispatch(setProfileImg())}
                />
              </label>
              <img
                src={profileUrl ? profileUrl :"https://placehold.co/90x90"}
                alt="profile"
                className="h-[90px] w-[90px] rounded-full border-2"
              />
            </div>
          </div>
          <div>
            <p className="font-medium text-xs text-center">Cover photo</p>
            <div className="h-[90px] w-[240px] rounded-lg mt-2 relative">
              <label
                for="coverImg"
                className="absolute right-[-10px] top-[-4px] cursor-pointer"
              >
                <MdAddCircleOutline className='text-2xl'/>

                
                <input
                  type="file"
                  name="coverImg"
                  id="coverImg"
                  className="opacity-0 w-[0px] h-[0px]"
                  onChange={handlebgImageChange}
                //   ,setlogoImg,setBgImg
                />
              </label>
              <img
                src={bgImg ? bgImg :"https://placehold.co/240x90"}
                alt="profile"
                className="h-[90px] w-[240px] rounded-lg object-cover"
              />
            </div>
          </div>
          <div>
            <p className="font-medium text-xs text-center">Company Logo</p>
            <div className="h-[90px] w-[90px] rounded-full mt-2 relative">
              <label
                for="logoImg"
                className="absolute right-[0px] top-[-1px] cursor-pointer"
              >
               

<MdAddCircleOutline className='text-2xl'/>

                <input
                  type="file"
                  name="logoImg"
                  id="logoImg"
                  className="opacity-0 w-[0px] h-[0px]"
                onChange={handlelogoImageChange}
                />
              </label>
              <img
                src={logoImg ? logoImg :"https://placehold.co/90x90"}
                alt="profile"
                className="h-[90px] w-[90px] rounded-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="w-[100%] mt-10">
          <h2 className="text-xs font-medium">Card Color</h2>
          <div className="w-[100%] flex justify-around mt-3">
            <label for="color">
              <div className="h-[26px] w-[26px] rounded-full border flex justify-center items-center cursor-pointer ">
                <IoMdColorFilter/>
                {/* <svg
                  className="MuiSvgIcon-root MuiSvgIcon-fontSize15px css-jpbqk9"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="ColorizeOutlinedIcon"
                >
                  <path d="m17.66 5.41.92.92-2.69 2.69-.92-.92 2.69-2.69M17.67 3c-.26 0-.51.1-.71.29l-3.12 3.12-1.93-1.91-1.41 1.41 1.42 1.42L3 16.25V21h4.75l8.92-8.92 1.42 1.42 1.41-1.41-1.92-1.92 3.12-3.12c.4-.4.4-1.03.01-1.42l-2.34-2.34c-.2-.19-.45-.29-.7-.29zM6.92 19 5 17.08l8.06-8.06 1.92 1.92L6.92 19z"></path>
                </svg> */}
              </div>
              <input
                type="color"
                name="color"
                id="color"
                className="opacity-0 w-[0px] h-[0px]"
                onChange={e=>dispatch(setColor(e.target.value))}

              />
            </label>
            <div className="h-[26px] w-[26px] rounded-full border flex justify-center items-center cursor-pointer bg-[#ffffff]" onClick={()=>dispatch(setColor("#ffffff"))}></div>
            <div className="h-[26px] w-[26px] rounded-full  flex justify-center items-center cursor-pointer bg-[#000000]" onClick={()=>dispatch(setColor("#000000"))}></div>
            <div className="h-[26px] w-[26px] rounded-full  flex justify-center items-center cursor-pointer bg-[#eb5757]" onClick={()=>dispatch(setColor("#eb5757"))}></div>
            <div className="h-[26px] w-[26px] rounded-full  flex justify-center items-center cursor-pointer bg-[#f2994a]" onClick={()=>dispatch(setColor("#f2994a"))}></div>
            <div className="h-[26px] w-[26px] rounded-full  flex justify-center items-center cursor-pointer bg-[#f2c94c]" onClick={()=>dispatch(setColor("#f2c94c"))}></div>
            <div className="h-[26px] w-[26px] rounded-full  flex justify-center items-center cursor-pointer bg-[#219653]" onClick={()=>dispatch(setColor("#219653"))}></div>
            <div className="h-[26px] w-[26px] rounded-full  flex justify-center items-center cursor-pointer bg-[#2f80ed]" onClick={()=>dispatch(setColor("#2f80ed"))}></div>
            <div className="h-[26px] w-[26px] rounded-full  flex justify-center items-center cursor-pointer bg-[#9b51e0]" onClick={()=>dispatch(setColor("#9b51e0"))}></div>
          </div>
        </div>
        <div className="w-[100%] mt-8">
          <div className="flex justify-between w-[100%]">
            <div>
              <h2 className="text-xs font-medium">Name</h2>
              <input
                type="text"
                placeholder="Name"
                className="mt-2 outline-none border-none w-[240px] h-[45px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
                onChange={(e)=>dispatch(setName(e.target.value))}
                value={name}
              />
            </div>
            <div>
              <h2 className="text-xs font-medium">Location</h2>
              <input
                type="text"
                placeholder="Location"
                className="mt-2 outline-none border-none w-[240px] h-[45px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
                onChange={(e)=>dispatch(setLocation(e.target.value))}
                value={location}
              />
            </div>
          </div>
          <div className="flex justify-between w-[100%] mt-5">
            <div>
              <h2 className="text-xs font-medium">Job Title</h2>
              <input
                type="text"
                placeholder="Job Title"
                className="mt-2 outline-none border-none w-[240px] h-[45px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
                onChange={(e)=>dispatch(setJob(e.target.value))}
                value={job}
              />
            </div>
            <div>
              <h2 className="text-xs font-medium">Company</h2>
              <input
                type="text"
                placeholder="Company"
                className="mt-2 outline-none border-none w-[240px] h-[45px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
                onChange={(e)=>dispatch(setCompany(e.target.value))}
                value={company}
              />
            </div>
          </div>
          <div className=" w-[100%] mt-5">
            <h2 className="text-xs font-medium">Bio</h2>
            <textarea  rows="4" cols="50" className="mt-2 outline-none border-none w-[100%]  bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"  onChange={(e)=>dispatch(setBio(e.target.value))}
                value={bio}>

            </textarea>
            {/* <input
              type="text"
              placeholder="Bio"
              className="mt-2 outline-none border-none w-[100%] h-[45px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
              onChange={(e)=>dispatch(setBio(e.target.value))}
                value={bio}
            /> */}
          </div>
        </div>
        <br />
      </div>
      <div className="w-[95%] h-[70px]  absolute bottom-0 flex flex-row-reverse border-t">
        <div className="flex justify-between items-center w-[250px]">
          <div className="h-[40px] w-[100px] border rounded-3xl mr-2 flex items-center justify-center cursor-pointer bg-white">
            <p className="text-sm font-medium ml-[3px] ">Cancel</p>
          </div>
          <div className="h-[40px] w-[120px] border rounded-3xl ml-2 bg-black flex items-center justify-center cursor-pointer" onClick={()=>addData()}>
            <p className="text-sm font-medium ml-[3px] text-white">Update</p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />

    </div>
  );
};

export default About;
