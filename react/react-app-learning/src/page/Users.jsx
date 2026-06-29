import { useEffect, useReducer } from "react";
import userReducer, { initialState, fetchUsers } from "../hooks/usersReducer";

const Users = () => {
    const [state, dispatch] = useReducer(userReducer, initialState);
    const { users, isRequesting } = state;

    useEffect(() => {
        fetchUsers()(dispatch);
    }, [])

    if (isRequesting) return <div>Loading...</div>

    return (
        <div>
            {
                users.map((user) => (
                    <ul key={user.id}>
                        <li> {user.name} - {user.email}</li>
                    </ul>
                ))
            }
        </div>
    )
}

export default Users;