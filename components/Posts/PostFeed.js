import React, {useEffect, useState} from "react";
import { getPostFeed} from "../../lib/api";
import Card from "react-bootstrap/Card";
import Post from "./Post";

const PostFeed = ({auth}) => {
    const {user = null} = auth || null;
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts();
    }, [])

    function getPosts() {
        if (user !== null) {
            getPostFeed(auth.user._id).then((posts) => setPosts(posts));
        }
    }
    return (
        <>
            {posts.length > 0 && posts.map((post, i) => (
               <Post key={i} auth={auth} post={post} />
            ))}
        </>
    )
}

export default PostFeed;
