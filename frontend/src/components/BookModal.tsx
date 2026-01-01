import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { CREATE_BOOK, UPDATE_BOOK } from '../graphql/mutations';
import { Book, CreateBookInput, BookStatus } from '../types/book';

/**
 * Book Modal Component
 * - Handles both creating new books and editing existing ones
 * - Uses react-hook-form for form validation
 */
interface BookModalProps {
  isOpen: boolean;
  onClose: (shouldRefetch: boolean) => void;
  book?: Book | null;
}

const BookModal: React.FC<BookModalProps> = ({ isOpen, onClose, book }) => {
  const toast = useToast();
  const isEditing = !!book;

  // Form handling with validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateBookInput>({
    defaultValues: {
      title: '',
      author: '',
      description: '',
      status: BookStatus.WANT_TO_READ,
    },
  });

  // Reset form when book changes or modal opens
  useEffect(() => {
    if (isOpen) {
      if (book) {
        reset({
          title: book.title,
          author: book.author,
          description: book.description || '',
          status: book.status,
        });
      } else {
        reset({
          title: '',
          author: '',
          description: '',
          status: BookStatus.WANT_TO_READ,
        });
      }
    }
  }, [book, isOpen, reset]);

  // Create book mutation
  const [createBook] = useMutation(CREATE_BOOK, {
    onCompleted: () => {
      toast({
        title: 'Book created',
        description: 'Your book has been successfully created.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose(true);
    },
    onError: (error) => {
      toast({
        title: 'Error creating book',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  // Update book mutation
  const [updateBook] = useMutation(UPDATE_BOOK, {
    onCompleted: () => {
      toast({
        title: 'Book updated',
        description: 'Your book has been successfully updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose(true);
    },
    onError: (error) => {
      toast({
        title: 'Error updating book',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  // Handle form submission
  const onSubmit = async (data: CreateBookInput) => {
    if (isEditing && book) {
      await updateBook({
        variables: {
          updateBookInput: {
            id: book.id,
            ...data,
          },
        },
      });
    } else {
      await createBook({
        variables: {
          createBookInput: data,
        },
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)} size="xl">
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            {isEditing ? 'Edit Book' : 'Create New Book'}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl isInvalid={!!errors.title} mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Enter book title"
                {...register('title', {
                  required: 'Book title is required',
                  minLength: {
                    value: 1,
                    message: 'Book title must be at least 1 character',
                  },
                  maxLength: {
                    value: 200,
                    message: 'Book title must not exceed 200 characters',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.title?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.author} mb={4}>
              <FormLabel>Author</FormLabel>
              <Input
                placeholder="Enter author name"
                {...register('author', {
                  required: 'Author is required',
                  minLength: {
                    value: 1,
                    message: 'Author must be at least 1 character',
                  },
                  maxLength: {
                    value: 100,
                    message: 'Author must not exceed 100 characters',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.author?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.status} mb={4}>
              <FormLabel>Status</FormLabel>
              <Select
                {...register('status', {
                  required: 'Status is required',
                })}
              >
                <option value={BookStatus.WANT_TO_READ}>Want to Read</option>
                <option value={BookStatus.CURRENTLY_READING}>Currently Reading</option>
                <option value={BookStatus.READ}>Read</option>
              </Select>
              <FormErrorMessage>
                {errors.status?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.description}>
              <FormLabel>Description (Optional)</FormLabel>
              <Textarea
                placeholder="Enter book description"
                rows={4}
                {...register('description', {
                  maxLength: {
                    value: 1000,
                    message: 'Description must not exceed 1000 characters',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.description?.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={() => onClose(false)}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={isSubmitting}
            >
              {isEditing ? 'Update' : 'Create'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default BookModal;