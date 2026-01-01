import React, { useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createApolloClient } from './lib/apollo-client';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { ProtectedRoute } from './components/ProtectedRoute';

/**
 * Main App Component
 * - Sets up Auth0, Apollo Client, and Chakra UI providers
 * - Configures routing with protected routes
 */
function App() {
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();

  // Create Apollo Client with Auth0 token getter
  const apolloClient = useMemo(() => {
    return createApolloClient(async () => {
      try {
        if (!isAuthenticated) {
          return '';
        }
        return await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          },
        });
      } catch (error) {
        console.error('Error getting token:', error);
        return '';
      }
    });
  }, [isAuthenticated, getAccessTokenSilently]);

  // Show loading spinner while Auth0 initializes
  if (isLoading) {
    return (
      <ChakraProvider>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}>
          Loading...
        </div>
      </ChakraProvider>
    );
  }

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;