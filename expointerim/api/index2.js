import express from 'express';
import { ApolloServer } from 'apollo-server-express'; // Import ApolloServer from apollo-server-express
import schema from './schema.js'; // Import your schema.js file

const app = express();
const server = new ApolloServer({
  schema, // Pass your schema to the ApolloServer constructor
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});