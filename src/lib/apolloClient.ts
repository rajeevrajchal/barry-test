import { createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import fetch from 'isomorphic-unfetch';

const httpLink = createHttpLink({
    uri: 'http://localhost:3000/api/graphql',
    fetch: fetch,
});
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),

});
export default client;
