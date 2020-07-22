import React, {useCallback, useEffect, useState} from "react";
import {
    addComment,
    addPost,
    deleteComment,
    deletePost,
    getPostFeed,
    likePost,
    unlikePost,
} from "../../lib/api";
import Post from "./Post";
import NewPost from "./NewPost";

const INITIAL_VALUE = {
    text: "",
    image: "",
};

function PostFeed({auth}) {
    const {user = null} = auth || null;
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState(INITIAL_VALUE);
    const [isAddingPost, setIsAddingPost] = useState(false);

    useEffect(() => {
        getPosts();
    }, []);

    function getPosts() {
        if (user !== null) {
            getPostFeed(auth.user._id).then((posts) => setPosts(posts));
        }
    }

    const handleAddComment = useCallback((postId, text) => {
        const comment = {text};
        addComment(postId, comment).then((postData) => {
            const postIndex = posts.findIndex((post) => post._id === postData._id);
            const updatedPosts = [
                ...posts.slice(0, postIndex),
                postData,
                ...posts.slice(postIndex + 1),
            ];
            setPosts(updatedPosts);
        });
    }, [posts])

    const handleToggleLike = useCallback((post) => {
            const isPostLiked = post.likes.includes(auth.user._id);
            const sendRequest = isPostLiked ? unlikePost : likePost;
            sendRequest(post._id)
                .then((postData) => {
                    const postIndex = posts.findIndex((post) => post._id === postData._id);
                    const updatedPosts = [
                        ...posts.slice(0, postIndex),
                        postData,
                        ...posts.slice(postIndex + 1),
                    ];
                    setPosts(updatedPosts);
                })
                .catch((err) => console.error(err));
        }, [posts]
    )

    const handleDeleteComment = useCallback((postId, comment) => {
            deleteComment(postId, comment)
                .then((postData) => {
                    const postIndex = posts.findIndex((post) => post._id === postData._id);
                    const updatedPosts = [
                        ...posts.slice(0, postIndex),
                        postData,
                        ...posts.slice(postIndex + 1),
                    ];
                    setPosts(updatedPosts);
                })
                .catch((err) => console.error(err));
        }, [posts]
    );

    const handleDeletePost = useCallback((deletedPost) => {
        deletePost(deletedPost._id)
            .then((postData) => {
                const postIndex = posts.findIndex((post) => post._id === postData._id);
                const updatedPosts = [
                    ...posts.slice(0, postIndex),
                    ...posts.slice(postIndex + 1),
                ];
                setPosts(updatedPosts);
            })
            .catch((err) => console.error(err));
    }, [posts])

    function handleChange(e) {
        const {name, value, files} = e.target;
        if (name === "image") {
            setNewPost((prevState) => ({...prevState, image: files[0]}));
        } else {
            setNewPost((prevState) => ({...prevState, [name]: value}));
        }
    }

    function handleAddPost(e) {
        e.preventDefault();
        setIsAddingPost(true);
        const formData = new FormData();
        formData.append("image", newPost.image);
        formData.append("text", newPost.text);
        addPost(auth.user._id, formData)
            .then((postData) => {
                const updatedPosts = [postData, ...posts];
                setPosts(updatedPosts);
                setNewPost(INITIAL_VALUE);
                formData.delete("image");
                setIsAddingPost(false);
            })
            .catch((err) => {
                console.error(err);
                setIsAddingPost(false);
            });
    }

    return (
        <div className="mt-3">
            {user && user._id && (
                <NewPost
                    isAddingPost={isAddingPost}
                    auth={auth}
                    handleAddPost={handleAddPost}
                    handleChange={handleChange}
                    image={newPost.image}
                    text={newPost.text}
                />
            )}

            {user !== null &&
            posts.length > 0 &&
            posts.map((post, i) => (
                <Post
                    key={i}
                    auth={auth}
                    handleAddComment={handleAddComment}
                    handleToggleLike={handleToggleLike}
                    handleDeleteComment={handleDeleteComment}
                    handleDeletePost={handleDeletePost}
                    post={post}
                />
            ))}
        </div>
    );
};

export default PostFeed;
