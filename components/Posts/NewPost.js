import {Card, Form, Button} from "react-bootstrap";
import React from "react";

const NewPost = ({text, image, handleChange, handleAddPost, auth, isAddingPost}) => (
    <Card className={"mb-3 mx-auto"} style={{width: '600px', height: 'auto'}}>
        <Card.Body>
            <Form onSubmit={handleAddPost}>
               <div className={'d-flex justify-content-center align-items-center'}>

                   <img src={auth.user.avatar}
                        style={{height: '30px', width: '30px'}}
                        className="card-img rounded-circle mr-2"
                        alt={auth.user.name}/>

                   <Form.Group controlId="exampleForm.ControlTextarea1" className={'w-100 mb-0'}>
                       <Form.Control
                           type={'text'}
                           onChange={handleChange}
                           style={{
                               borderRadius: '20px',
                               backgroundColor: 'rgb(58, 59, 60)'
                           }}
                           className={'text-white-50 border-0 small'}
                           placeholder={"What's on your mind?"}
                           name={"text"}
                           value={text} />
                   </Form.Group>
               </div>

                <Form.Group className={'d-none'}>
                    <Form.File
                        accept={"image/*"}
                        name={"image"}
                        onChange={handleChange}
                        id="image"
                        label="Upload image" />
                </Form.Group>

                <div className={'d-flex align-items-center'}>
                    <label htmlFor="image" className='btnUpload'>
                        <i className={'fas fa-photo-video'} role="text" /> Upload Image/Video
                    </label>
                    <span>{image && image.name}</span>
                </div>
                {isAddingPost ? (
                    <button className="btn btn-sm btn-primary btn-block" style={{borderRadius: '25px'}} type="button" disabled>
                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
                        Posting...
                    </button>
                ): (
                    <Button variant="primary" className={'btn-block'} style={{borderRadius: '25px', width: '93%', marginLeft: '7%'}} type="submit">
                        Post
                    </Button>
                )}

            </Form>
        </Card.Body>
    </Card>
)

export default NewPost;