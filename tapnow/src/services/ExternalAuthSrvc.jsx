import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../Firebase";
import { update } from "firebase/database";
import { ref } from "firebase/database";
import { toast } from "react-toastify";


// -----------------------------------Handle Sign up/in with google------------------------------------ 


export const handleSignUpGoogle = (objkeys,navigate) => {

    console.log('into the func')
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider).then((response) => {
    let result = objkeys?.some((key) => { return key == response?.user?.uid })
    console.log(response?.user)



    if (!result) {
        let username=response?.user?.displayName?.replace(/\s/g, '') + response?.user?.uid
        update(ref(db, `User/${response?.user?.uid}`), { id: response?.user?.uid , name:response?.user?.displayName,userName:username ,email:response?.user?.email,bgImg:'',bio:'',job:'',colorCode:'#2f80ed',company:'',directMode:false ,qrColor:'',qrLogo:'',phone:'',logoImg:'',leadForm:{Fname:true,company:true,email:true,job:true,note:true,phone:true},leadMode:false ,location:'',formHeader:'',allowTeamLogin:true,loginAllow:true,profileUrl:response?.user?.photoURL}).then(()=>{
            toast.success('Sign in with Google')
            navigate('/home')
            localStorage.setItem('tapNowUid',response?.user?.uid)
            })
    }else{
        toast.success('Sign in with Google')
        navigate('/home') 
        localStorage.setItem('tapNowUid',response?.user?.uid)
    }
  }).catch((error) => {
    console.log(error)
  })

}

// -----------------------------------Handle Sign up/in with Facebook------------------------------------ 



export const handleSignUpFacebook = async (objkeys,navigate) => {
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider).then((response) => {
    
      if (response) {
        const user = response.user;
        // console.log(user, 'login user', response, 'console of login user response')
        // localStorage.setItem("provider", "Facebook")
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(response);
        const accessToken = credential.accessToken;
        // console.log(response?.user?.photoURL)
        let result = objkeys.some((key) => { return key == response?.user?.uid })
        if (!result) {

            let username=response?.user?.displayName?.replace(/\s/g, '') + response?.user?.uid
            update(ref(db, `User/${response?.user?.uid}`), { id: response?.user?.uid , name:response?.user?.displayName,userName:username ,email:response?.user?.email,bgImg:'',bio:'',job:'',colorCode:'#2f80ed',company:'',directMode:false ,qrColor:'',qrLogo:'',phone:'',logoImg:'',leadForm:{Fname:true,company:true,email:true,job:true,note:true,phone:true},leadMode:false ,location:'',formHeader:'',allowTeamLogin:true,loginAllow:true,profileUrl:response?.user?.photoURL}).then(()=>{
                toast.success('Sign in with Google')
                navigate('/home')
                localStorage.setItem('tapNowUid',response?.user?.uid)
                })


        //   set(ref_database(db, 'User/' + response?.user?.uid), {
        //     address: "",
        //     bio: "",
        //     directMode: false,
        //     dob: "",
        //     email: response?.user?.email,
        //     fcmToken: "",
        //     gender: "",
        //     links: '',
        //     id: response?.user?.uid,
        //     isDeleted: false,
        //     logoUrl: "",
        //     name: response?.user?.displayName,
        //     phone: "",
        //     language: 'es',
        //     platform: "web",
        //     profileOn: 1,
        //     profileUrl: "",
        //     tagUid: "",
        //     timestamp: "",
        //     username: response?.user?.displayName
        //   })
        }
        // response?.user?.photoURL
      }
    })
  }