import React, {useCallback, useState} from "react";
import {authInitialProps} from "../lib/auth";
import {
    getUser,
    getPostsByUser,
    addComment,
    unlikePost,
    likePost,
    deleteComment,
    deletePost,
    addPost
} from "../lib/api";
import Head from "next/head";
import Link from "next/link";
import Post from "../components/Posts/Post";
import FollowUser from "../components/Profile/FollowUser";

function Profile({auth, userId}) {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);

    React.useEffect(() => {
        getUser(userId).then(async user => {
            const isAuth = auth.user._id === userId;
            const posts = await getPostsByUser(userId);
            setPosts(posts);
            setIsAuth(isAuth);
            setUser(user);
        })
    }, []);

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

    return (
        <div>
            <Head>
                <title>Profile</title>
            </Head>
            <div>
                <h4 className={"text-white mt-4"}>Profile Page</h4>
                <div className="card mb-3">
                    <img src={user.avatar} className="card-img-top" style={{width: 200, height: 200}} alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">
                            {user.about}
                        </p>
                        {isAuth && (
                            <Link href="/edit-profile">
                                <a className="btn btn-info btn-sm">Edit</a>
                            </Link>
                        )}
                    </div>
                    <div className="card-body">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab"
                                   aria-controls="home" aria-selected="true">Posts</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab"
                                   aria-controls="profile" aria-selected="false">Profile</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab"
                                   aria-controls="contact" aria-selected="false">Contact</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active"
                                 id="home"
                                 role="tabpanel"
                                 aria-labelledby="home-tab">
                                {posts.map((post, i) => (
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
                            <div className="tab-pane fade" id="profile" role="tabpanel"
                                 aria-labelledby="profile-tab">
                                <FollowUser users={user.following} />
                            </div>
                            <div className="tab-pane fade" id="contact" role="tabpanel"
                                 aria-labelledby="contact-tab">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Profile.getInitialProps = authInitialProps(true);
export default Profile;
