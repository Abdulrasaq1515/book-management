export enum BookStatus {
  WANT_TO_READ = 'WANT_TO_READ',
  CURRENTLY_READING = 'CURRENTLY_READING',
  READ = 'READ',
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  status: BookStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookInput {
  title: string;
  author: string;
  description?: string;
  status: BookStatus;
}

export interface UpdateBookInput {
  id: string;
  title?: string;
  author?: string;
  description?: string;
  status?: BookStatus;
}