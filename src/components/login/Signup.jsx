
import { useState } from "react";
import "./login.css";
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { ToastContainer, toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
function Signup() {
    const [userDetails, setUserDetails] = useState({
        "username": "",
        "email": "",
        "password": "",
        "photo": "",

    })
    const handleSignup = async (e) => {
        e.preventDefault();
        console.log(userDetails);

        try {
            const res = await createUserWithEmailAndPassword(auth, userDetails.email, userDetails.password);
            await setDoc(doc(db, "users", res.user.uid), {
                username: userDetails.username,
                email: userDetails.email,
                photo: userDetails.photo,
                blocked: [],
            });
            await setDoc(doc(db, "userchats", res.user.uid), {
                chats: []
            })
            toast.success("Registered Succesfully!!", {
                position: "top-center"
            })

        } catch (err) {
            console.log(err.code);
            if(err.code=="auth/email-already-in-use"){
                toast.error("Email already in use.", {
                    position: "top-center"
                });
            }
            else{
                toast.error("Error" + err, {
                    position: "top-center"
                });
            }
            
        }
    }
    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const res = await signInWithPopup(auth, provider);
            console.log(res);
            await setDoc(doc(db, "users", res.user.uid), {
                username: res.user.displayName,
                email: res.user.email,
                photo: res.user.photoURL,
                blocked: [],
            });
            await setDoc(doc(db, "userchats", res.user.uid), {
                chats: []
            })
            console.log(res);
            toast.success("Registered Succesfully !!", {
                position: "top-center"
            })


        } catch (err) {
            console.log(err);
            toast.error("Error" + err, {
                position: "top-center"
            });
        }


    }
    const handleChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        });
    }
    return (
        <div className="login">
            <div className="loginContainer">
                <div className="texts">
                    <h2 className="small">Create an account with</h2>
                    <h2 className="big">Chatify!👋</h2>
                </div>
                <input type="text" placeholder="Username" name="username" onChange={handleChange} />
                <input type="email" placeholder="Email" name="email" onChange={handleChange} />
                <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                <button onClick={handleSignup} className="loginButton">Signup</button>

                <div className="googleTexts">
                    <p>-or continue with-</p>
                </div>
                <img onClick={handleGoogleLogin} src="./google.png" alt="" />
                <div className="registeredUser">
                    <p>Already an account?  <span><a href=""> Login</a></span></p>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Signup