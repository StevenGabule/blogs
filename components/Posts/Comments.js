import React, {useState} from "react";
import Link from "next/link";
import moment from 'moment'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
const Comments = ({auth, comments, postId, handleAddComment, handleDeleteComment}) => {
    const [text, setText] = useState('');

    function showComment(comment) {
        const isCommentCreator = comment.postedBy._id === auth.user._id;
        return (
            <div style={{backgroundColor: 'rgb(58, 59, 60)', borderRadius: '18px'}} className={'pl-3 pb-1 pr-3'}
                 key={comment._id}>
                <Link href={`/profile/${comment.postedBy._id}`}>
                    <a className={'text-white text-capitalize small font-weight-bold'}>{comment.postedBy.name}</a>
                </Link>
                <div className={'d-flex justify-content-between'}>
                    <span style={{fontSize: '.9375rem'}}>
                        {comment.text} {isCommentCreator && (
                            <FontAwesomeIcon icon={faTrashAlt} className={'ml-3'} onClick={() => handleDeleteComment(postId, comment)} />
                        )}
                    </span>
                    <span style={{fontSize: '12px'}}>
                        {moment(comment.createdAt).fromNow()}
                    </span>
                </div>
            </div>
        )
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleAddComment(postId, text)
        setText('');
    }

    return (
        <div>
            <div className="pl-3 pr-3 mb-3 d-flex justify-content-center align-items-center">
                <img src={auth.user.avatar}
                     style={{height: '30px', width: '30px'}}
                     className="card-img rounded-circle mr-2"
                     alt={auth.user.name}/>

                <form onSubmit={handleSubmit} className={'w-100'}>
                    <input type="text"
                           onChange={(e) => setText(e.target.value)}
                           className={'form-control form-control-sm border-0 text-white-50'}
                           placeholder={'Write a comment'}
                           style={{borderRadius: '20px', backgroundColor: 'rgb(58, 59, 60)'}}
                           name={'text'}
                           value={text}/>
                </form>

            </div>
            {comments.map((comment, i) => (
                <div className={'pl-3 pr-3 pb-3 d-flex justify-content-center align-items-center'} key={i}>
                    <img src={comment.postedBy.avatar}
                         style={{height: '30px', width: '30px'}}
                         className="card-img rounded-circle mr-2"
                         alt={comment.postedBy.name}/>
                    <div className="card-body p-0">
                        {showComment(comment)}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Comments;