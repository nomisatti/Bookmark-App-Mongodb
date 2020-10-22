import gql from 'graphql-tag'
export const BOOKMARK_QUERY = gql`{
    bookmark {
        _id 
        title
        url
        description
        image
    }
  }
`
export const ADD_BOOKMARK = gql`
  mutation addBookMark($url: String! , $description: String! , $title:String! , $image: String!){
    addBookMark(url: $url , description : $description , title : $title , image : $image){
      url
    }
  }
`;

export const REMOVE_BOOKMARK = gql`
  mutation removeBookMark ($_id : ID!){
    removeBookMark(_id : $_id) {
      _id
    }
  }
`;