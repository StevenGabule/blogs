import React from "react";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faThumbsUp, faEllipsisH, faComment} from '@fortawesome/free-solid-svg-icons'
import Comments from "./Comments";

const Post = ({auth, post, handleAddComment, handleToggleLike, handleDeleteComment, handleDeletePost}) => {

    const comments = post.comments;
    const numLikes = post.likes.length;
    const isPostCreator = post.postedBy._id === auth.user._id;
    const isLiked = checkLiked(post.likes);

    function checkLiked(likes) {
        return likes.includes(auth.user._id);
    }

    return (
        <Card className={"mb-3 mx-auto"} style={{width: '600px', height: 'auto'}}>
            <Card.Title className={"pt-2 pl-3 post-card mb-0"}>
                <div>
                    {post.postedBy.avatar && (<img src={post.postedBy.avatar} className={"avatar"} alt=""/>)}
                    <span className={"post-title"}>
                         <Link href={`/profile/${post.postedBy._id}`}>
                            <a>{post.postedBy.name}</a>
                        </Link>
                    </span>
                </div>

                <div className="dropdown">
                    <button className="btn btn-secondary bg-transparent border-0 dropdown-card" type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className={'fa-layers fa-fw'}>
                           <FontAwesomeIcon icon={faEllipsisH} className={'font-weight-bold'}/>
                        </span>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {isPostCreator && (
                            <button onClick={() => handleDeletePost(post)} type="button" className={'dropdown-item'}>
                                Delete
                            </button>
                        )}
                    </div>
                </div>

            </Card.Title>

            <Card.Body className={"p-1 pl-3 pb-2"}>
                <Card.Text>{post.text}</Card.Text>
            </Card.Body>

            <Card.Img src={post.image} variant={'bottom'} alt=""/>

            <Card.Footer>
                <div className={'d-flex cd-foo border-top border-bottom pt-2 pb-2'}>
                    <div className={'w-100 mr-1'}>
                        <button onClick={() => handleToggleLike(post)}
                                type="button"
                                className={isLiked ? 'btn font-weight-bold border-0 btn-block text-primary'
                                    : 'btn font-weight-bold border-0 text-muted btn-block'}>
                            <FontAwesomeIcon icon={faThumbsUp}/> Like {numLikes}
                        </button>
                    </div>
                    <div className={'w-100 ml-1'}>
                        <button type="button" className="btn font-weight-bold border-0 text-muted btn-block">
                            <FontAwesomeIcon icon={faComment}/> Comment {comments.length}
                        </button>
                    </div>
                </div>
            </Card.Footer>
            <Comments auth={auth} handleAddComment={handleAddComment} handleDeleteComment={handleDeleteComment} postId={post._id} comments={comments}/>
        </Card>
    )
}

export default Post;