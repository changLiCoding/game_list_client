import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
// import { setContext } from "@apollo/client/link/context";

// create an http link
const httpLink = new HttpLink({
  uri: import.meta.env.VITE_BACKEND,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  connectToDevTools: true,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getAllLikedGames: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },

      StatusUpdate: {
        fields: {
          likedUsers: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          comments: {
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
      Post: {
        fields: {
          likedUsers: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          comments: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
      Like: {
        fields: {
          likeable: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});
