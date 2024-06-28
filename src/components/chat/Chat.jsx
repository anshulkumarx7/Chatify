import { useEffect, useRef, useState } from "react"
import "./chat.css"
import EmojiPicker from "emoji-picker-react"
import { auth, db } from "../../lib/firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/useUserStore";
import { update } from "firebase/database";
function Chat() {
    const { currentUser } = useUserStore();

    const [picker, setPicker] = useState(false);
    const [text, setText] = useState("");
    const [chat, setChat] = useState();
    const { chatId,user } = useChatStore();
    const { resetChat } = useChatStore();
    const endRef = useRef(null);
    useEffect(() => {
        endRef.current?.scrollIntoView({ behaviour: "smooth" });
    }, []);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
            setChat(res.data());
        })

        return () => {
            unSub();
        }
    }, [chatId])
    console.log(chat)
    const handleEmoji = e => {
        setText((prev) => prev + e.emoji);
    }

    const handleSend = async () => {
        if (text === "") return;
        try {
            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    senderId: currentUser.uid,
                    text,
                    createdAt: new Date()
                })
            })
            const userIDs = [currentUser.uid, user.uid];

            userIDs.forEach(async (id) => {
                const userChatsRef = doc(db, "userchats", id)
                const userChatSnapshot = await getDoc(userChatsRef)
                if (userChatSnapshot.exists()) {
                    const userChatsData = userChatSnapshot.data()
                    const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId);
                    userChatsData.chats[chatIndex].lastMessage = text;
                    userChatsData.chats[chatIndex].isSeen = id === currentUser.uid ? true : false;
                    userChatsData.chats[chatIndex].updatedAt = Date.now();
                    await updateDoc(userChatsRef,{
                        chats:userChatsData.chats
                    });
                    setText("");
                }
            })


        } catch (err) {
            console.log(err);
            toast.error("Unknown Error",{
                position:"top-center"
            });
            setText("");
        }
    }


    const handleSignOut = async () => {
        try {
            await signOut(auth);
            resetChat();

            toast.success("Logout Successfully", {
                position: "top-center"
            })
        } catch (err) {
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
                {chat?.messages?.map((message) => {
                    return (<div className="message own" key={message?.createAt}>
                        <div className="texts">
                            {message.img && <img src={message.img} alt="" />}
                            <p>{message.text}</p>
                            {/* <span>1 min ago</span> */}
                        </div>
                    </div>)

                })}

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
                <button onClick={handleSend} className="sendButton">Send</button>
            </div>
        </div>
    )
}

export default Chat