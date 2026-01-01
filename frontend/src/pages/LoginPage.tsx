import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

/**
 * Login Page Component
 * - Displays login button for Auth0
 * - Redirects to dashboard if already authenticated
 */
const LoginPage: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box minH="100vh" bg={bgColor} display="flex" alignItems="center">
      <Container maxW="md">
        <VStack spacing={8} align="stretch">
          <VStack spacing={2}>
            <Heading size="2xl" textAlign="center">
              📚 Book Dashboard
            </Heading>
            <Text textAlign="center" color="gray.600">
              Manage your book collection with ease
            </Text>
          </VStack>

          <Box
            bg={useColorModeValue('white', 'gray.800')}
            p={8}
            borderRadius="lg"
            boxShadow="lg"
          >
            <VStack spacing={6}>
              <Text textAlign="center">
                Sign in to access your book dashboard and start managing your collection.
              </Text>

              <Button
                colorScheme="blue"
                size="lg"
                width="full"
                onClick={() => loginWithRedirect()}
              >
                Sign In with Auth0
              </Button>

              <Text fontSize="sm" color="gray.500" textAlign="center">
                New user? Auth0 will guide you through the sign-up process.
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default LoginPage;