import { delay } from "../helpers";

export const fetchPosts = () => async (dispatch) => {
    try {
        dispatch(({ type: "requesting" }));
        await delay(500);
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        dispatch(({ type: "fetch-posts", payload: data }));
    } catch (error) {
        dispatch(({ type: "error" }))
    }
}