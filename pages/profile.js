import React from "react";
import {authInitialProps} from "../lib/auth";

export default function Profile() {
    return (
        <div>
            Profile
        </div>
    )
}

Profile.getInitialProps = authInitialProps();
