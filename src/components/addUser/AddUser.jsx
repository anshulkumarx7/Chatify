import { useState } from "react";
import "./addUser.css";
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { ToastContainer, toast } from "react-toastify";
import { useUserStore } from "../../lib/useUserStore";
function AddUser() {
    const { currentUser } = useUserStore();
    const [user, setUser] = useState(null);
    const [uname, setUname] = useState("");
    const handleChange = (event) => {
        setUname(event.target.value);
    }
    console.log(uname);

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            console.log("checked");
            const userRef = collection(db, "users");
            const q = query(userRef, where("username", "==", uname));
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot.empty)
            if (!querySnapshot.empty) {
                console.log("hence")
                setUser(querySnapshot.docs[0].data());
            }
            else {
                setUser(null);
                toast.error("No user found", {
                    position: "top-center"
                })
            }
        } catch (err) {
            setUser(null);
            toast.error("Something Unexpected Occur", {
                position: "top-center"
            })

        }
    }

    const handleAdd = async () => {
        const chatsRef = collection(db, "chats");
        const userChatsRef = collection(db, "userchats");
        console.log(user);
        try {
            const newChatsRef = doc(chatsRef);

            await setDoc(newChatsRef, {
                createdAt: serverTimestamp(),
                messages: []
            })
            await updateDoc(doc(userChatsRef, user.uid), {
                chats: arrayUnion({
                    chatId: newChatsRef.id,
                    lastMessage: "",
                    receiverId: currentUser.uid,    
                    updatedAt: Date.now(),

                })
            })
            await updateDoc(doc(userChatsRef, currentUser.uid), {
                chats: arrayUnion({
                    chatId: newChatsRef.id,
                    lastMessage: "",
                    receiverId: user.uid,
                    updatedAt: Date.now(),
                })
            })

            toast.success("User Added to chat list!!",{
                position:"top-center"
            })
        } catch (err) {
            console.log(err);
            toast.error("Something Unexpected happened!! Please try again later !!",{
                position:"top-center"
            })
        }

    }
    return (
        <div className="addUser">
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Search Username" value={uname} name="uname" onChange={handleChange} />
                <button>Search</button>
            </form>
            {user && <div className="user">
                <div className="detail">
                    <img src={user.photo || "./avatar.png"} alt="" />
                    <span>{user.username}</span>
                </div>
                <button onClick={handleAdd} >Add User</button>
            </div>}

            <ToastContainer />
        </div>
    )
}

export default AddUser