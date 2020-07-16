import {Card, Form, Button} from "react-bootstrap";
import React from "react";

const Create = ({text, image, handleChange, handleAddPost}) => (
    <Card style={{width: '50rem'}} className={"mt-4"}>
        <Card.Body>
            <Form onSubmit={handleAddPost}>
                <Card.Title>What's on your mind?</Card.Title>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control onChange={handleChange} as="textarea" rows="3" name={"text"} value={text} />
                </Form.Group>

                <Form.Group>
                    <Form.File accept={"image/*"} name={"image"} onChange={handleChange}  id="image" label="Upload image" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>
        </Card.Body>
    </Card>
)

export default Create;