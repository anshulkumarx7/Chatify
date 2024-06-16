import "./addUser.css";
function AddUser() {
    return (
        <div className="addUser">
            <form>
                <input type="text" placeholder="Search Username" name="username" />
                <button>Search</button>
            </form>
            <div className="user">
                <div className="detail">
                    <img src="./avatar.png" alt="" />
                    <span>Usha</span>
                </div>
                <button>Add User</button>
            </div>
        </div>
    )
}

export default AddUser