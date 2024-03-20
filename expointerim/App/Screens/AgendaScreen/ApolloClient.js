import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// const client = new ApolloClient({
//   uri: 'http://localhost:4000/', // Replace with your GraphQL endpoint
//   cache: new InMemoryCache()
// });


const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


export default client;