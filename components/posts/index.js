import React, {useEffect, useState} from "react";
import {getPostAll, getPostFeed} from "../../lib/api";
import Card from "react-bootstrap/Card";

const Post = ({auth}) => {
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
                <Card key={i}>
                    <Card.Body>
                        <Card.Title>{post.text}</Card.Title>
                        <img src={post.image} alt="no image found"/>
                    </Card.Body>
                </Card>
            ))}
        </>
    )
}

export default Post;
