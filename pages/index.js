import React from "react";
import {authInitialProps} from "../lib/auth";
import PostFeed from "../components/Posts/PostFeed";

function Index({auth}) {

    return (
        <>
            <h5>Index</h5>
            <PostFeed auth={auth}/>
        </>

    )
}

Index.getInitialProps = authInitialProps();
export default Index;
