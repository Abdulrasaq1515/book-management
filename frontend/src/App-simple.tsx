import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SimpleDashboardPage from './pages/DashboardPage-simple';

// Simple Apollo Client without Auth0
const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
  }),
  cache: new InMemoryCache(),
});

/**
 * Simple App Component for testing without Auth0
 */
function SimpleApp() {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SimpleDashboardPage />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default SimpleApp;