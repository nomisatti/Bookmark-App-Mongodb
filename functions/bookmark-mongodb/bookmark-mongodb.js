const { ApolloServer, gql } = require('apollo-server-lambda')
var mongoose = require('mongoose')
let connection = null;

databaseConnection = async() => {
  if(!connection) {
    try{
      mongoose.connect('mongodb+srv://nomisatti:nomisatti@cluster0.il5s9.mongodb.net/BookMark?retryWrites=true&w=majority' , {
        useNewUrlParser:true , useUnifiedTopology:true , bufferCommands: false , bufferMaxEntries:0
      });

      connection = mongoose.connection;
      
      await connection;
      console.log('mongoose open for business');

      // Define Scehma 
      const BookMarkSchema = new mongoose.Schema({
        id : {type:Number , index: true} ,
        title: String ,
        url : String ,
        description : String ,
        image : String
      })

      // Creating Model 
      mongoose.models.BookMarkModel || mongoose.model('BookMark', BookMarkSchema);
    }
    catch(error) {
      console.log("DataBase Error : " , error)
    }
  }
 return connection;
}

const typeDefs = gql`
  type Query {
    bookmark: [Bookmark]
  }
  type Bookmark {
    _id: ID!
    title: String!
    url: String!
    description : String!
    image : String !
  }

  type Mutation {
    addBookMark(url: String! , description: String! , title: String! , image: String!) : Bookmark ,
    removeBookMark (_id:ID!) :Bookmark
  }
`



const resolvers = {
  Query: {
    bookmark: async(parent, args, context) => {
      try {
        await databaseConnection();
        const BookmarkResult = mongoose.models.BookMark

        const result = await BookmarkResult.find({});
        console.log("Result : " , result);
        return result
      }

      catch(error) {
        console.log("Error " , error)
      }
    },
  },
  Mutation : {
    addBookMark : async(_,{url,description,title,image}) =>{
      try {
        const newBookMark = mongoose.models.BookMark({
          url : url,
          description : description,
          title : title,
          image : image,
        })
        const result = await newBookMark.save();

      }
      catch(error){
        console.log('Error : ' ,error)
      }
    } ,
    removeBookMark : async (_ , id) =>{
      try{
        const removeBookmark = mongoose.models.BookMark
        const result = await removeBookmark.deleteOne({_id :id})
        console.log("result : " , result)
      }
      catch (error) {
        console.log("Error : " , error)
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
})

exports.handler = server.createHandler()
