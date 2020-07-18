import React from "react";
import {authInitialProps} from "../lib/auth";
import PostFeed from "../components/Posts/PostFeed";
import Head from 'next/head';

function Index({auth}) {

    return (
        <div>
            <Head>
                <title>Homepage</title>
            </Head>
            <PostFeed auth={auth}/>
        </div>

    )
}

Index.getInitialProps = authInitialProps();
export default Index;
