import React from "react";
import { authInitialProps } from "../lib/auth";
import Head from 'next/head'

function Profile() {
    return (
        <div>
            <Head>
                <title>Profile</title>
            </Head>
            <div>
                <h4>Profile Page</h4>
            </div>
        </div>
    )
}

Profile.getInitialProps = authInitialProps();
export default Profile;