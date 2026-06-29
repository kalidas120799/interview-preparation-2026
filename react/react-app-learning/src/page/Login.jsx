import react, { useCallback, useContext } from "react";
import {useNavigate} from "react-router-dom"
import { UserContext } from "../context/UserContext"

const Login = () => {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    const handleLogin = useCallback(() => {
        userContext.setUserInfo({
            name: "Kalidas S",
            email: "kalidas@gmail.com",
            role: "admin",
            isLoggedIn: true
        });
        navigate("/");
    },[])

    return (
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login