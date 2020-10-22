import React from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client'
import { ADD_BOOKMARK, BOOKMARK_QUERY } from './graphql/graphql'
import { Link } from 'gatsby';

export default (location) => {
    const [bookmark] = useMutation(ADD_BOOKMARK)
    console.log('Props : ', location)
    let title, image, url, descp

    let addbookmark = (e) => {
        e.preventDefault()
        try{
            bookmark({
                variables: {
                    url: url.value,
                    description: descp.value,
                    title: title.value,
                    image: image.value
                },
                refetchQueries: [{ query: BOOKMARK_QUERY }]
            })
            alert('Bookmark added successfully')
        }
        catch (err) {
            alert('Something went wrong , try again')
        }
    
        // console.log('url : ', url, ' title ', title, ' description : ', description, 'image : ', image)
    }
    return (

        <Container>
            <Link to='/' className="btn btn-info" >Go Back</Link>
            <hr/>
            <h1> Add New BookMark </h1>

            
            <Form onSubmit={(e) => addbookmark(e)}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Bookmark Title</Form.Label>
                    <Form.Control ref={node => title = node} type="title" placeholder="Enter Title" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>Description</Form.Label>
                    <Form.Control ref={node => descp = node} as="textarea" rows={3} type="description" placeholder="Enter Short Description" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput3">
                    <Form.Label>BookMark Url</Form.Label>
                    <Form.Control ref={node => url = node} type="Enter url" placeholder="Enter Bookmark page url" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput4">
                    <Form.Label>Image Url</Form.Label>
                    <Form.Control ref={node => image = node} type="Enter Image Url" placeholder="Enter Image Url" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add New
                </Button>

            </Form>

        </Container>

    )
}