import { useState } from "react"
import "./chat.css"
import EmojiPicker from "emoji-picker-react"
function Chat() {
    const [picker, setPicker] = useState(false);
    const [text, setText] = useState("");
    const handleEmoji = e => {
        setText((prev) => prev + e.emoji);
        // setPicker(false);
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
                    <img src="./info.png" alt="" />
                </div>
            </div>
            <div className="center"></div>
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