import { signOut } from "firebase/auth";
import { useUserStore } from "../../../lib/useUserStore";
import "./userInfo.css";
import { toast } from "react-toastify";
import { auth } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";
function UserInfo() {
  const { currentUser} = useUserStore();
  const {resetChat}=useChatStore();
  console.log(currentUser.photo)
  const handleSignOut=async()=>{
    try{
        await signOut(auth);
        resetChat();
        toast.success("Logout Successfully", {
            position: "top-center"
        })
    }catch(err){
        toast.error("Try again after some time!!", {
            position: "top-center"
        })
    }
}
  return (
    <div className="userInfo">
        <div className="user">
            <img src={currentUser.photo || './avatar.png'}  alt=""/>
            <h2>{currentUser.username}</h2>
        </div>
        <div className="icons">
            <img onClick={handleSignOut} src="./more.png" alt=""/>
            <img src="./video.png" alt=""/>
            <img src="./edit.png" alt=""/>
        </div>
    </div>
  )
}

export default UserInfo