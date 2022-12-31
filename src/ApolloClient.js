import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
	uri: "http://41.191.74.42:8000/graphql/",
	//uri: "http://localhost:8000/graphql/",
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("token");

	return {
		headers: {
			...headers,
			authorization: token ? `JWT ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

export default client;
