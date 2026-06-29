import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { fetchPosts } from "../redux/postsActions"

const Posts = () => {
    const dispatch = useDispatch();
    const queryParams = new URLSearchParams(window.location.search);
    const userId = queryParams.get("userId");

    const [postsList, setPostList] = useState([]);

    const posts = useSelector((state) => state.posts);

    useEffect(() => { dispatch(fetchPosts()) }, []);

    useEffect(() => {
        if (posts.posts) {
            if (userId) {
                let filteredPosts = posts.posts.filter((post) => post.userId.toString() === userId);
                setPostList(filteredPosts)
            } else (setPostList(posts.posts))
        }
    }, [posts.isRequesting])

    if (posts.isRequesting) return <div>Loading...</div>

    return (
        <div>
            {
                postsList.map((post) => (
                    <div key={post.id}>
                        <h1>{post.title}</h1>
                        <p>{post.body}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Posts;