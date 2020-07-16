import React from "react";
import {authInitialProps} from "../lib/auth";
import Post from "../components/posts";

function Index({auth}) {

    return (
        <>
            <h5>Index</h5>
            <Post auth={auth}/>
        </>

    )
}

Index.getInitialProps = authInitialProps();
export default Index;
