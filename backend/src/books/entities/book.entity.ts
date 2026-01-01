import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum BookStatus {
  WANT_TO_READ = 'WANT_TO_READ',
  CURRENTLY_READING = 'CURRENTLY_READING',
  READ = 'READ',
}

registerEnumType(BookStatus, {
  name: 'BookStatus',
});

/**
 * Book Entity - Represents a book in both database and GraphQL schema
 * - TypeORM decorators (@Entity, @Column) for database mapping
 * - GraphQL decorators (@ObjectType, @Field) for schema generation
 */
@ObjectType()
@Entity('books')
export class Book {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'text' })
  title: string;

  @Field()
  @Column({ type: 'text' })
  author: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field(() => BookStatus)
  @Column({
    type: 'text',
    enum: BookStatus,
    default: BookStatus.WANT_TO_READ,
  })
  status: BookStatus;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'text', nullable: true })
  createdBy?: string; // Auth0 user ID
}