import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
// import { setContext } from "@apollo/client/link/context";

// create an http link
const httpLink = new HttpLink({
  // uri: import.meta.env.VITE_BACKEND,
  uri: 'https://gamelist.up.railway.app/graphql/',
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      StatusUpdate: {
        fields: {
          likedUsers: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
      Follow: {
        fields: {
          followedUsers: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          followers: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});
