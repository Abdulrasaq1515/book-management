import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spinner,
  Text,
  useDisclosure,
  useToast,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { GET_BOOKS } from '../graphql/queries';
import { Book } from '../types/book';
import BookTable from '../components/BookTable';
import BookModal from '../components/BookModal';

/**
 * Dashboard Page Component
 * - Main page for authenticated users
 * - Displays book table and provides CRUD operations
 */
const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth0();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Fetch all books
  const { data, loading, error, refetch } = useQuery<{ books: Book[] }>(GET_BOOKS);

  // Handle opening modal for creating a new book
  const handleCreate = () => {
    setEditingBook(null);
    onOpen();
  };

  // Handle opening modal for editing an existing book
  const handleEdit = (book: Book) => {
    setEditingBook(book);
    onOpen();
  };

  // Handle closing modal and refetching data
  const handleModalClose = (shouldRefetch: boolean) => {
    onClose();
    setEditingBook(null);
    if (shouldRefetch) {
      refetch();
    }
  };

  // Show loading state
  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  // Show error state
  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box
          bg="red.50"
          p={4}
          borderRadius="md"
          borderLeft="4px"
          borderColor="red.500"
        >
          <Text color="red.700">
            Error loading books: {error.message}
          </Text>
        </Box>
      </Container>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Header */}
      <Box bg="white" boxShadow="sm" mb={8}>
        <Container maxW="container.xl">
          <Flex h={16} alignItems="center" justifyContent="space-between">
            <Heading size="lg"> Book Dashboard</Heading>
            
            <HStack spacing={4}>
              <Text fontSize="sm" color="gray.600">
                {user?.email}
              </Text>
              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  cursor="pointer"
                  minW={0}
                >
                  <Avatar size="sm" name={user?.name} src={user?.picture} />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => logout({ 
                    logoutParams: { returnTo: window.location.origin } 
                  })}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center" mb={6}>
          <Box>
            <Heading size="md" mb={2}>
              Your Books
            </Heading>
            <Text color="gray.600">
              {data?.books.length || 0} books in your collection
            </Text>
          </Box>
          
          <Button
            leftIcon={<AddIcon />}
            colorScheme="blue"
            onClick={handleCreate}
          >
            Add Book
          </Button>
        </Flex>

        <BookTable
          books={data?.books || []}
          onEdit={handleEdit}
          onRefetch={refetch}
        />
      </Container>

      {/* Create/Edit Book Modal */}
      <BookModal
        isOpen={isOpen}
        onClose={handleModalClose}
        book={editingBook}
      />
    </Box>
  );
};

export default DashboardPage;