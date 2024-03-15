import { GraphQLServer } from 'graphql-yoga'

const typeDefs = `
    type Query {
        hello: String!
    }

`

const resolvers = {
    Query: {
        hello: () => "World"
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})