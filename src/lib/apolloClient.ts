import { $FIXME } from '@utils/constant';
import { createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import fetch from 'isomorphic-unfetch';
import { setContext } from '@apollo/client/link/context';

const url = process.env.NODE_ENV === 'production' ? "https://barry-test.vercel.app": 'http://localhost:3000';
const httpLink = createHttpLink({
    uri: `${url}/api/graphql`,
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

const client = (token?: string) => new ApolloClient({
    link: authLink(token || '').concat(httpLink),
    cache: new InMemoryCache(),
    credentials: 'include'

});
export default client;

