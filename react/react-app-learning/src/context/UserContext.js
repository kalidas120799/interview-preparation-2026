import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        role: "",
        isLoggedIn: false
    })
    return <UserContext.Provider value={{ userInfo, setUserInfo }}>
        {props.children}
    </UserContext.Provider>
}

export default UserContextProvider;