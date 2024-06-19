
// import Detail from "./components/detail/Detail"
import List from "./components/list/List"
import Chat from "./components/chat/Chat"
import { useEffect } from "react";
import Login from "./components/login/Login";
// import Signup from "./components/login/Signup";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/useUserStore";
import { FallingLines } from "react-loader-spinner";
function App() {
  const { currentUser, fetchUserInfo, isLoading } = useUserStore();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user);
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);
  console.log(currentUser);
  if (isLoading) return <div>
    <FallingLines
      color="#FFFFFF"
      width="200"
      visible={true}
      ariaLabel="falling-circles-loading"
    />
  </div>
  return (
    <div className="container">
      {
        currentUser ? (
          <>
            <List />
            <Chat />
            {/* <Detail /> */}
          </>
        ) : (
          <Login />
        )
      }

      {/* <Signup /> */}



    </div>
  )
}

export default App
