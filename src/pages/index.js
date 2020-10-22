import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { REMOVE_BOOKMARK, BOOKMARK_QUERY } from '../graphql/graphql'
import './index.css'
import { Table, Container } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client'
import { Link } from "gatsby";


export default function Home() {

  const { loading, error, data } = useQuery(BOOKMARK_QUERY)
  const [removeBookmark] = useMutation(REMOVE_BOOKMARK)

  let removeBookMark = (e) => {
    try {
      if (window.confirm("Are you sure ? You want to remove this bookmark")) {
        removeBookmark({
          variables: {
            _id: e
          },
          refetchQueries: [{ query: BOOKMARK_QUERY }]
        })
        alert('Bookmark removed successfully !')
      }


    }
    catch (error) {
      alert('Something went wrong , try again .')
    }


  }
  if (loading) {
    return <p> Loading ....</p>
  }
  if (error) {
    return <p> Error .... </p>
  }
  if (data) {
    console.log('Data : ', data)
  }
  return (
    
    <Container >
      <Link to='/AddNew' className='btn btn-info' >Add New</Link>
      <br /> <br />
      <Table responsive striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Actions </th>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Go To Link</th>

          </tr>
        </thead>
        <tbody>
          {data.bookmark.map((d => (
            <tr key={d._id}>

              <td>
                <button onClick={(e) => removeBookMark(d._id)} type="button" className="btn btn-danger">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                  </svg>
                    Remove
                  </button>
              </td>
              <td><img className='bookmark-image' src={d.image} alt={d.image} /></td>
              <td>{d.title}</td>
              <td className='descp'>{d.description}</td>
              <td><Link className='btn btn-primary' to={d.url} >Read More</Link></td>
            </tr>
          )))}
        </tbody>
      </Table>
    </Container>
            
  )
}
