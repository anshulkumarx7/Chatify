import { useEffect, useRef, useState } from "react"
import "./chat.css"
import EmojiPicker from "emoji-picker-react"
import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
function Chat() {
    const [picker, setPicker] = useState(false);
    const [text, setText] = useState("");

    const endRef=useRef(null);
    useEffect(()=>{
        endRef.current?.scrollIntoView({behaviour:"smooth"});
    },[]);
    const handleEmoji = e => {
        setText((prev) => prev + e.emoji);
        // setPicker(false);
    }
    const handleSignOut=async()=>{
        try{
            await signOut(auth);
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
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <span>Anshul</span>
                        <p>Tech enthusiast 😎</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img onClick={handleSignOut} src="./info.png" alt="" />
                </div>
            </div>
            <div className="center">
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam eveniet eligendi veniam unde architecto autem nisi laudantium quae natus fuga.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam eveniet eligendi veniam unde architecto autem nisi laudantium quae natus fuga.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam eveniet eligendi veniam unde architecto autem nisi laudantium quae natus fuga.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam eveniet eligendi veniam unde architecto autem nisi laudantium quae natus fuga.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam eveniet eligendi veniam unde architecto autem nisi laudantium quae natus fuga.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <img src="./avatar.png" alt="" />
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam eveniet eligendi veniam unde architecto autem nisi laudantium quae natus fuga.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src="./img.png" alt="" />
                    {/* <img src="./camera.png" alt="" />
                <img src="./mic.png" alt="" /> */}
                </div>
                <input className="input" value={text} type="text" placeholder="Type a message ..." onChange={e => setText(e.target.value)} />
                <div className="emoji">
                    <img src="./emoji.png" alt="" onClick={() => setPicker((prev) => !prev)} />
                    <div className="picker">
                        <EmojiPicker open={picker} onEmojiClick={handleEmoji} />
                    </div>
                </div>
                <button className="sendButton">Send</button>
            </div>
        </div>
    )
}

export default Chat