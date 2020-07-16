import React from "react";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faThumbsUp, faEllipsisH, faComment} from '@fortawesome/free-solid-svg-icons'

const Post = ({auth, post}) => {

    const isPostCreator = post.postedBy._id === auth.user._id;

    return (
        <Card className={"mb-3 mx-auto"} style={{width: '600px', height: 'auto'}}>
            <Card.Title className={"pt-2 pl-3 post-card mb-0"}>
                <div>
                    <img src={post.postedBy.avatar} className={"avatar"} alt="no image found"/>
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
                        <FontAwesomeIcon icon={faEllipsisH} className={'font-weight-bold large'}/>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {isPostCreator && (
                            <a href="" className={'dropdown-item'}>Delete</a>
                        )}
                    </div>
                </div>

            </Card.Title>
            <Card.Body className={"p-1 pl-3 pb-2"}>
                <Card.Text>{post.text}</Card.Text>
            </Card.Body>
            <Card.Img src={post.image} variant={'bottom'} alt="no image found"/>
            <Card.Footer>
                <div className={'d-flex cd-foo border-top border-bottom pt-2 pb-2'}>
                    <div className={'w-100 mr-1'}>
                        <button type="button" className="btn font-weight-bold border-0 text-muted btn-block">
                            <FontAwesomeIcon icon={faThumbsUp}/> Like
                        </button>
                    </div>
                    <div className={'w-100 ml-1'}>
                        <button type="button" className="btn font-weight-bold border-0 text-muted btn-block">
                            <FontAwesomeIcon icon={faComment}/> Comment
                        </button>
                    </div>
                </div>
            </Card.Footer>
        </Card>
    )
}

export default Post;