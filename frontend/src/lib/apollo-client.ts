import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

/**
 * Create Apollo Client with Auth0 authentication
 * - Adds JWT token to every GraphQL request
 * - Configures cache for better performance
 * - Handles authentication errors gracefully
 */
export const createApolloClient = (getAccessToken: () => Promise<string>) => {
  // HTTP connection to the GraphQL API
  const httpLink = new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:4000/graphql',
  });

  // Auth middleware to add JWT token to requests
  const authLink = setContext(async (_, { headers }) => {
    try {
      const token = await getAccessToken();
      
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    } catch (error) {
      console.error('Error getting access token:', error);
      return { headers };
    }
  });

  // Error handling link
  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.error(
          `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
    }

    if (networkError) {
      console.error(`Network error: ${networkError}`);
      
      // Handle authentication errors
      if (networkError.statusCode === 401) {
        console.log('Authentication error - user may need to log in');
      }
    }
  });

  // Create and return Apollo Client
  return new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            books: {
              merge(existing = [], incoming) {
                return incoming;
              },
            },
          },
        },
      },
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  });
};