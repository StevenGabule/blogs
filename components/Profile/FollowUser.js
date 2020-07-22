import React from "react";
import {followerUser, unFollowerUser} from "../../lib/api";

const FollowUser = ({isFollowing, toggleFollow}) => {
    const request = isFollowing ? unFollowerUser : followerUser;
    return (
        <button type={"button"} onClick={() => toggleFollow(request)} style={{backgroundColor: `${isFollowing} ? "secondary" : "primary"`}}>
            {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
    )
}

export default FollowUser;