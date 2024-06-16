import { useState } from "react"
import "./chatList.css"
import AddUser from "../../addUser/AddUser";
function ChatList() {
    const [addMode, setAddMode] = useState(false);
    return (
        <div className="chatList">
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" alt="" />
                    <input type="text" placeholder="Search" />
                </div>
                <img onClick={()=>setAddMode((prev)=> !prev)} className="plus" src={addMode ? "./minus.png" : "./plus.png"} alt="" />
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Aryan</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Aryan</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Aryan</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Aryan</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Aryan</span>
                    <p>Hello</p>
                </div>
            </div>
            {addMode && <AddUser/>}
        </div>
    )
}

export default ChatList