import { $FIXME } from '@utils/constant';
import { createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import fetch from 'isomorphic-unfetch';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    // uri: 'https://barry-test.vercel.app/api/graphql',
    uri: 'http://localhost:4000/api/graphql',
    fetch: fetch,
});

const authLink = (token: string | null) => setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = (token: string | null) => new ApolloClient({
    link: authLink(token).concat(httpLink),
    cache: new InMemoryCache(),
    credentials: 'include'

});
export default client;

