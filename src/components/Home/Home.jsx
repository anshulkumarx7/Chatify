import { useChatStore } from "../../lib/chatStore";
import Chat from "../chat/Chat"
import List from "../list/List"

function Home() {
  const {chatId} =useChatStore();
  return (
    <>
        <List/>
        {chatId && <Chat/>}
    </>
  )
}

export default Home