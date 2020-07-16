import React, {useEffect, useState} from "react";
import {authInitialProps} from "../../lib/auth";
import Create from "../../components/posts/create";
import {addPost} from "../../lib/api";

const INITIAL_VALUE = {
    text: "",
    image: "",
}

const PostCreate = ({auth}) =>{
    const [post, setPost] = useState(INITIAL_VALUE);

    function handleChange(e) {
       const {name, value, files} = e.target;
       if (name === "image") {
           setPost(prevState => ({...prevState, image: files[0]}))
       } else {
           setPost(prevState => ({...prevState, [name]: value}))
       }
    }

    async function handleAddPost(e) {
        e.preventDefault();
        console.log(post);
        const formData = new FormData();
        formData.append('image', post.image);
        formData.append('text', post.text);
        await addPost(auth.user._id, formData).then((postData) => {
            setPost(INITIAL_VALUE);
            console.log(postData)
        })
    }

    return (
        <div>
            <Create handleChange={handleChange} text={post.text} image={post.image} handleAddPost={handleAddPost} />
        </div>
    )
}

PostCreate.getInitialProps = authInitialProps();

export default PostCreate;