import { ToastContainer, toast } from "react-toastify";
import "./login.css";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { Link, useNavigate } from "react-router-dom";
function Login() {
    const navigate=useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
        })

    }
    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, user.email, user.password);
            toast.success("LoggedIn Succesfully !!", {
                position: "top-center"
            })
            console.log("done");
            setTimeout(()=>{
                navigate("/");
            },5000);

        } catch (err) {
            if (err.code == "auth/invalid-credential") {
                toast.error("Invalid Credential.", {
                    position: "top-center"
                });
            }
            else {
                toast.error("Error: " + err.code, {
                    position: "top-center"
                });
            }
        }
    }

    return (
        <div className="login">
            <div className="loginContainer">
                <div className="texts">
                    <h2 className="small">Hello!</h2>
                    <h2 className="big">Welcome back!👋</h2>
                </div>
                <input type="email" placeholder="Email" name="email" onChange={handleChange} />
                <input type="password" placeholder="Password" name="password" onChange={handleChange} />

                <button onClick={handleLogin} className="loginButton">Login</button>

                <div className="googleTexts">
                    <p>-or continue with-</p>
                </div>

                <img src="./google.png" alt="" />
                <div className="registeredUser">
                    <p><span><Link to="/signup">Create an account</Link></span></p>
                </div>

                <ToastContainer />





            </div>
        </div>
    )
}

export default Login