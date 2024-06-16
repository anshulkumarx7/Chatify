
import "./login.css";
function Signup() {
  return (
    <div className="login">
            <div className="loginContainer">
                <div className="texts">
                    <h2 className="small">Create an account with</h2>
                    <h2 className="big">Chatify!👋</h2>
                </div>
                <input type="text" placeholder="Username" name="username" />
                <input type="email" placeholder="Email" name="email" />
                <input type="password" placeholder="Password" name="password" />

                <button className="loginButton">Signup</button>

                <div className="googleTexts">
                    <p>-or continue with-</p>
                </div>

                <img src="./google.png" alt="" />

                <div className="registeredUser">
                    <p>Already an account?  <span><a href=""> Login</a></span></p>
                </div>







            </div>
        </div>
  )
}

export default Signup