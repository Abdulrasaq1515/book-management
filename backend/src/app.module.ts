import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { HealthController } from './health.controller';

/**
 * Root application module
 * - Configures environment variables with ConfigModule
 * - Configures GraphQL with Apollo Server
 * - Sets up TypeORM with SQLite database
 * - Imports feature modules (Books, Auth)
 */
@Module({
  imports: [
    // Environment Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // GraphQL Configuration
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Auto-generate schema
      sortSchema: true, // Sort schema alphabetically for consistency
      playground: true, // Enable GraphQL playground
      introspection: true, // Enable introspection
      context: ({ req }) => ({ req }), // Pass request to context for auth
    }),

    // Database Configuration (SQLite)
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_PATH || 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Enable for SQLite in production (safe for small apps)
      logging: process.env.NODE_ENV === 'development', // Log queries in dev mode
    }),

    // Feature Modules
    AuthModule,
    BooksModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}