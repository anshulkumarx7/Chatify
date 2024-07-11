import { useEffect, useState } from "react"
import "./chatList.css"
import AddUser from "../../addUser/AddUser";
import { useUserStore } from "../../../lib/useUserStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";
import { FallingLines } from "react-loader-spinner";
function ChatList() {
    const [addMode, setAddMode] = useState(false);
    const [loader, setLoader] = useState(true);
    const [chats, setChats] = useState([]);
    const { currentUser } = useUserStore();
    const { changeChat } = useChatStore();
    useEffect(() => {

        const unsub = onSnapshot(doc(db, "userchats", currentUser.uid), async (res) => {
            const items = res.data().chats;
            const promises = items.map(async (item) => {
                const docRef = doc(db, "users", item.receiverId);
                const docSnap = await getDoc(docRef);
                const user = docSnap.data();
                return { ...item, user };
            });
            setLoader(false);

            const chatData = await Promise.all(promises);
            setChats(chatData.sort((a, b) => b.UpdatedAt - a.UpdatedAt));
        });
        


        return () => {
            unsub();
        }
    }, [currentUser.uid]);
    const handleSelect = async (chat) => {
        const userChats = chats.map((item) => {
            const { user, ...rest } = item;
            return rest;
        });
        const chatIndex = userChats.findIndex(item => item.chatId === chat.chatId);

        userChats[chatIndex].isSeen = true;
        const userChatsRef = doc(db, "userchats", currentUser.uid);

        try {
            await updateDoc(userChatsRef, {
                chats: userChats
            });
            changeChat(chat.chatId, chat.user);

        } catch (err) {
            console.log(err);
        }

    }
    return (
        <div className="chatList">
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" alt="" />
                    <input type="text" placeholder="Search" />
                </div>
                <img onClick={() => setAddMode((prev) => !prev)} className="plus" src={addMode ? "./minus.png" : "./plus.png"} alt="" />
            </div>
            {loader && <div className="loader">
                <FallingLines
                    color="#FFFFFF"
                    width="50"
                    visible={true}
                    ariaLabel="falling-circles-loading"
                />
            </div>}
            {chats.map(chat => (
                <div className="item" key={chat.chatId} onClick={() => handleSelect(chat)}
                    style={{ backgroundColor: chat?.isSeen ? "transparent" : "#c52525" }} >
                    <img src={chat.user.photo || "./avatar.png"} alt="" />
                    <div className="texts">
                        <span>{chat.user.username}</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>
            ))}
            {addMode && <AddUser />}
        </div>
    )
}

export default ChatList