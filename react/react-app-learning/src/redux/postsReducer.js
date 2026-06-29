export const initialState = {
    posts: [],
    isRequesting: false,
    error: ""
}

function postsReducer(state = initialState, action) {
    switch (action.type) {
        case "fetch-posts":
            return {
                ...state,
                posts: action.payload,
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

export default postsReducer;