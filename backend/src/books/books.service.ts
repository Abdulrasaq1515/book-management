import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async create(createBookInput: CreateBookInput, userId: string): Promise<Book> {
    const book = this.booksRepository.create({
      ...createBookInput,
      createdBy: userId,
    });
    return this.booksRepository.save(book);
  }

  async findAll(userId: string): Promise<Book[]> {
    return this.booksRepository.find({
      where: { createdBy: userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Book> {
    return this.booksRepository.findOne({ 
      where: { id, createdBy: userId } 
    });
  }

  async update(id: string, updateBookInput: UpdateBookInput, userId: string): Promise<Book> {
    await this.booksRepository.update(
      { id, createdBy: userId }, 
      updateBookInput
    );
    return this.findOne(id, userId);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const result = await this.booksRepository.delete({ 
      id, 
      createdBy: userId 
    });
    return result.affected > 0;
  }
}