
import { useEffect } from "react";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/useUserStore";
import { FallingLines } from "react-loader-spinner";
import { useChatStore } from "./lib/chatStore";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
function App() {
  const { currentUser, fetchUserInfo, isLoading } = useUserStore();
  const { chatId } = useChatStore();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);
  console.log(currentUser);
  console.log(chatId);
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
      <Routes>
        <Route path='/' element={currentUser ? <Home />:<Navigate replace to ={"/login"}/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
