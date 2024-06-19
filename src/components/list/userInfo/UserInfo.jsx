import { useUserStore } from "../../../lib/useUserStore";
import "./userInfo.css";
function UserInfo() {
  const { currentUser} = useUserStore();
  console.log(currentUser.photo)
  return (
    <div className="userInfo">
        <div className="user">
            <img src={currentUser.photo || './avatar.png'}  alt=""/>
            <h2>{currentUser.username}</h2>
        </div>
        <div className="icons">
            <img src="./more.png" alt=""/>
            <img src="./video.png" alt=""/>
            <img src="./edit.png" alt=""/>
        </div>
    </div>
  )
}

export default UserInfo