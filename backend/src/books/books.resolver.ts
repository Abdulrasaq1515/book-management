import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { SimpleJwtGuard } from '../auth/simple-jwt.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Resolver(() => Book)
@UseGuards(SimpleJwtGuard)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Mutation(() => Book)
  createBook(
    @Args('createBookInput') createBookInput: CreateBookInput,
    @CurrentUser() user: any,
  ) {
    console.log('Creating book for user:', user.sub);
    return this.booksService.create(createBookInput, user.sub);
  }

  @Query(() => [Book], { name: 'books' })
  findAll(@CurrentUser() user: any) {
    console.log('Finding books for user:', user.sub);
    return this.booksService.findAll(user.sub);
  }

  @Query(() => Book, { name: 'book' })
  findOne(@Args('id') id: string, @CurrentUser() user: any) {
    return this.booksService.findOne(id, user.sub);
  }

  @Mutation(() => Book)
  updateBook(
    @Args('updateBookInput') updateBookInput: UpdateBookInput,
    @CurrentUser() user: any,
  ) {
    return this.booksService.update(updateBookInput.id, updateBookInput, user.sub);
  }

  @Mutation(() => Boolean)
  removeBook(@Args('id') id: string, @CurrentUser() user: any) {
    return this.booksService.remove(id, user.sub);
  }
}