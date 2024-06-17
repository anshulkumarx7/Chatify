import { ToastContainer } from "react-toastify";
import "./login.css";
function Login() {
    return (
        <div className="login">
            <div className="loginContainer">
                <div className="texts">
                    <h2 className="small">Hello!</h2>
                    <h2 className="big">Welcome back!👋</h2>
                </div>
                <input type="email" placeholder="Email" name="email" />
                <input type="password" placeholder="Password" name="password" />

                <button className="loginButton">Login</button>

                <div className="googleTexts">
                    <p>-or continue with-</p>
                </div>

                <img src="./google.png" alt="" />

                <ToastContainer />





            </div>
        </div>
    )
}

export default Login