import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";

// create an http link
const httpLink = new HttpLink({
  uri: import.meta.env.VITE_BACKEND,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
