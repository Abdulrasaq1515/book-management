import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
      description
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_BOOK = gql`
  query GetBook($id: String!) {
    book(id: $id) {
      id
      title
      author
      description
      status
      createdAt
      updatedAt
    }
  }
`;