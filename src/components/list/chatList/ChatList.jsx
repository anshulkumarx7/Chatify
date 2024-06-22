import { useEffect, useState } from "react"
import "./chatList.css"
import AddUser from "../../addUser/AddUser";
import { useUserStore } from "../../../lib/useUserStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";
function ChatList() {
    const [addMode, setAddMode] = useState(false);
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

            const chatData = await Promise.all(promises);
            setChats(chatData.sort((a, b) => b.UpdatedAt - a.UpdatedAt));
        });

        return () => {
            unsub();
        }
    }, [currentUser.uid])

    const handleSelect = async (chat) => {
        changeChat(chat.chatId, chat.user);
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
            {chats.map(chat => (
                <div className="item" key={chat.chatId} onClick={handleSelect(chat)} >
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