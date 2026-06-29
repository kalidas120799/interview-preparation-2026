import { delay } from "../helpers";

export const initialState = {
    users: [],
    isRequesting: false,
    error: ""
}

export const fetchUsers = () => async (dispatch) => {
    try {
        dispatch(({ type: "requesting" }));
        await delay(500);
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        dispatch(({ type: "fetch-users", payload: data }));
    } catch (error) {
        dispatch(({ type: "error" }))
    }
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case "fetch-users":
            return {
                ...state,
                users: action.payload,
                isRequesting: false
            }
        case "requesting":
            return {
                ...state,
                isRequesting: true
            }
        case "error":
            return {
                ...state,
                isRequesting: false
            }
        default:
            return state;
    }
}

export default userReducer;