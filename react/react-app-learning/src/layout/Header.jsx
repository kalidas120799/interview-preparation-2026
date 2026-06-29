import react, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Header = () => {
    const { userInfo } = useContext(UserContext);
    return (
        <div>
            <div>Hi, {userInfo.name}</div>
            <div>
                <Link to={"/"} >Home</Link>
                <Link to={"/users"} >Users</Link>
                <Link to={"/posts"} >Posts</Link>
            </div>
            <Outlet />
        </div>
    )
}

export default Header