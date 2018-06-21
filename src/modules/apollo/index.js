import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const GRAPHQL_URI = process.env.GRAPHQL_URI || 'https://etermonitor.net/graphql';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_URI
  }),
  cache: new InMemoryCache(),
});