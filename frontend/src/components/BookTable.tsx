import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Badge,
  Text,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Book, BookStatus } from '../types/book';
import { DELETE_BOOK } from '../graphql/mutations';

interface BookTableProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onRefetch: () => void;
}

const BookTable: React.FC<BookTableProps> = ({ books, onEdit, onRefetch }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  const [deleteBook, { loading: deleteLoading }] = useMutation(DELETE_BOOK, {
    onCompleted: () => {
      toast({
        title: 'Book deleted',
        description: 'The book has been successfully deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onRefetch();
      onClose();
    },
    onError: (error) => {
      toast({
        title: 'Error deleting book',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleDeleteClick = (book: Book) => {
    setBookToDelete(book);
    onOpen();
  };

  const handleDeleteConfirm = () => {
    if (bookToDelete) {
      deleteBook({
        variables: { id: bookToDelete.id },
      });
    }
  };

  const getStatusColor = (status: BookStatus) => {
    switch (status) {
      case BookStatus.WANT_TO_READ:
        return 'gray';
      case BookStatus.CURRENTLY_READING:
        return 'blue';
      case BookStatus.READ:
        return 'green';
      default:
        return 'gray';
    }
  };

  const formatStatus = (status: BookStatus) => {
    return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  if (books.length === 0) {
    return (
      <Text textAlign="center" color="gray.500" py={8}>
        No books found. Add your first book to get started!
      </Text>
    );
  }

  return (
    <>
      <TableContainer bg="white" borderRadius="md" boxShadow="sm">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Author</Th>
              <Th>Status</Th>
              <Th>Description</Th>
              <Th>Created</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {books.map((book) => (
              <Tr key={book.id}>
                <Td fontWeight="medium">{book.title}</Td>
                <Td>{book.author}</Td>
                <Td>
                  <Badge colorScheme={getStatusColor(book.status)}>
                    {formatStatus(book.status)}
                  </Badge>
                </Td>
                <Td maxW="300px">
                  <Text noOfLines={2} fontSize="sm">
                    {book.description || 'No description'}
                  </Text>
                </Td>
                <Td fontSize="sm" color="gray.600">
                  {new Date(book.createdAt).toLocaleDateString()}
                </Td>
                <Td>
                  <Button
                    size="sm"
                    variant="ghost"
                    colorScheme="blue"
                    leftIcon={<EditIcon />}
                    onClick={() => onEdit(book)}
                    mr={2}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    leftIcon={<DeleteIcon />}
                    onClick={() => handleDeleteClick(book)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={undefined}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Book
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete "{bookToDelete?.title}"? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                colorScheme="red"
                onClick={handleDeleteConfirm}
                ml={3}
                isLoading={deleteLoading}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default BookTable;