import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// create an http link
const httpLink = new HttpLink({
	uri: import.meta.env.VITE_BACKEND,
});

// create an auth link
const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("token");

	return token
		? { headers: { ...headers, authorization: `Bearer ${token}` } }
		: headers;
});

export const apolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});
