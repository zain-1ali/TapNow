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
    


    // ,,setBgImg
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
      
    }
}




  return (
    <div class="w-[530px] h-[100%] p-4 relative">
        <Cropper cropModal={cropModal} handleclosecropper={handleclosecropper} theimg={prflimg} myimg={myprflimg} setmyimg={setmyprflimg} setcrop={setCropPrfl} crop={cropPrfl} aspect={1/1} setReduxState={setProfileImg}/>
      <div class="w-[100%] h-[80%] overflow-y-scroll scrollbar-hide">
        <div class="w-[100%]">
          <h2 class="text-xs font-medium">Card Title</h2>
          <input
            type="text"
            placeholder="Card Title"
            class="mt-2 outline-none border-none w-[220px] h-[40px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
          />
        </div>
        <div class="w-[100%] flex justify-around mt-[30px]">
          <div>
            <p class="font-medium text-xs text-center">Profile picture</p>
            <div class="h-[90px] w-[90px] rounded-full mt-2 relative ">
              <label
                for="img"
                class="absolute right-[0px] top-[-1px] cursor-pointer"
              >
                <MdAddCircleOutline class='text-2xl'/>
                
                <input
                  type="file"
                  name="img"
                  id="img"
                  class="opacity-0 w-[0px] h-[0px]"
                  onChange={handlePrflImageChange}
                //   onChange={()=> dispatch(setProfileImg())}
                />
              </label>
              <img
                src={profileUrl}
                alt="profile"
                class="h-[90px] w-[90px] rounded-full border-2"
              />
            </div>
          </div>
          <div>
            <p class="font-medium text-xs text-center">Cover photo</p>
            <div class="h-[90px] w-[240px] rounded-lg mt-2 relative">
              <label
                for="coverImg"
                class="absolute right-[-10px] top-[-4px] cursor-pointer"
              >
                <MdAddCircleOutline class='text-2xl'/>

                
                <input
                  type="file"
                  name="coverImg"
                  id="coverImg"
                  class="opacity-0 w-[0px] h-[0px]"
                //   ,setlogoImg,setBgImg
                />
              </label>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/tap-now-ae13b.appspot.com/o/1686130659502szZBjgVlYHcnTHFRIn3qiHl40sJ3?alt=media&amp;token=fe89883f-8d52-433d-90fc-b29bcbf84a3a"
                alt="profile"
                class="h-[90px] w-[240px] rounded-lg object-cover"
              />
            </div>
          </div>
          <div>
            <p class="font-medium text-xs text-center">Company Logo</p>
            <div class="h-[90px] w-[90px] rounded-full mt-2 relative">
              <label
                for="logoImg"
                class="absolute right-[0px] top-[-1px] cursor-pointer"
              >
               

<MdAddCircleOutline class='text-2xl'/>

                <input
                  type="file"
                  name="logoImg"
                  id="logoImg"
                  class="opacity-0 w-[0px] h-[0px]"
                //   ,setlogoImg,setBgImg
                />
              </label>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/tap-now-ae13b.appspot.com/o/1686124129211szZBjgVlYHcnTHFRIn3qiHl40sJ3?alt=media&amp;token=e6635e4e-7ad0-4a81-9031-d3cf74106f05"
                alt="profile"
                class="h-[90px] w-[90px] rounded-full object-cover"
              />
            </div>
          </div>
        </div>
        <div class="w-[100%] mt-10">
          <h2 class="text-xs font-medium">Card Color</h2>
          <div class="w-[100%] flex justify-around mt-3">
            <label for="color">
              <div class="h-[26px] w-[26px] rounded-full border flex justify-center items-center cursor-pointer ">
                <IoMdColorFilter/>
                {/* <svg
                  class="MuiSvgIcon-root MuiSvgIcon-fontSize15px css-jpbqk9"
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
                class="opacity-0 w-[0px] h-[0px]"
                onChange={(e)=>dispatch(setColor(e.target.value))}

              />
            </label>
            <div class="h-[26px] w-[26px] rounded-full border flex justify-center items-center cursor-pointer bg-[#ffffff]" onClick={()=>dispatch(setColor("#ffffff"))}></div>
            <div class="h-[26px] w-[26px] rounded-full  flex justify-center items-center cursor-pointer bg-[#000000]" onClick={()=>dispatch(setColor("#000000"))}></div>
            <div class="h-[26px] w-[26px] rounded-full  flex justify-center items-center cursor-pointer bg-[#eb5757]" onClick={()=>dispatch(setColor("#eb5757"))}></div>
            <div class="h-[26px] w-[26px] rounded-full  flex justify-center items-center cursor-pointer bg-[#f2994a]" onClick={()=>dispatch(setColor("#f2994a"))}></div>
            <div class="h-[26px] w-[26px] rounded-full  flex justify-center items-center cursor-pointer bg-[#f2c94c]" onClick={()=>dispatch(setColor("#f2c94c"))}></div>
            <div class="h-[26px] w-[26px] rounded-full  flex justify-center items-center cursor-pointer bg-[#219653]" onClick={()=>dispatch(setColor("#219653"))}></div>
            <div class="h-[26px] w-[26px] rounded-full  flex justify-center items-center cursor-pointer bg-[#2f80ed]" onClick={()=>dispatch(setColor("#2f80ed"))}></div>
            <div class="h-[26px] w-[26px] rounded-full  flex justify-center items-center cursor-pointer bg-[#9b51e0]" onClick={()=>dispatch(setColor("#9b51e0"))}></div>
          </div>
        </div>
        <div class="w-[100%] mt-8">
          <div class="flex justify-between w-[100%]">
            <div>
              <h2 class="text-xs font-medium">Name</h2>
              <input
                type="text"
                placeholder="Name"
                class="mt-2 outline-none border-none w-[240px] h-[45px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
                onChange={(e)=>dispatch(setName(e.target.value))}
                value={name}
              />
            </div>
            <div>
              <h2 class="text-xs font-medium">Location</h2>
              <input
                type="text"
                placeholder="Location"
                class="mt-2 outline-none border-none w-[240px] h-[45px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
                onChange={(e)=>dispatch(setLocation(e.target.value))}
                value={location}
              />
            </div>
          </div>
          <div class="flex justify-between w-[100%] mt-5">
            <div>
              <h2 class="text-xs font-medium">Job Title</h2>
              <input
                type="text"
                placeholder="Job Title"
                class="mt-2 outline-none border-none w-[240px] h-[45px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
                onChange={(e)=>dispatch(setJob(e.target.value))}
                value={job}
              />
            </div>
            <div>
              <h2 class="text-xs font-medium">Company</h2>
              <input
                type="text"
                placeholder="Company"
                class="mt-2 outline-none border-none w-[240px] h-[45px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
                onChange={(e)=>dispatch(setCompany(e.target.value))}
                value={company}
              />
            </div>
          </div>
          <div class=" w-[100%] mt-5">
            <h2 class="text-xs font-medium">Bio</h2>
            <input
              type="text"
              placeholder="Bio"
              class="mt-2 outline-none border-none w-[100%] h-[45px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
              onChange={(e)=>dispatch(setBio(e.target.value))}
                value={bio}
            />
          </div>
        </div>
        <br />
      </div>
      <div class="w-[95%] h-[70px]  absolute bottom-0 flex flex-row-reverse border-t">
        <div class="flex justify-between items-center w-[250px]">
          <div class="h-[40px] w-[100px] border rounded-3xl mr-2 flex items-center justify-center cursor-pointer bg-white">
            <p class="text-sm font-medium ml-[3px] ">Cancel</p>
          </div>
          <div class="h-[40px] w-[120px] border rounded-3xl ml-2 bg-black flex items-center justify-center cursor-pointer" onClick={()=>addData()}>
            <p class="text-sm font-medium ml-[3px] text-white">Update</p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />

    </div>
  );
};

export default About;
