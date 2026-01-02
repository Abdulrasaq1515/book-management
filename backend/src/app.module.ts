import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { HealthController } from './health.controller';
import { TestResolver } from './test.resolver';

/**
 * Minimal application module with GraphQL for frontend compatibility
 */
@Module({
  imports: [
    // Environment Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // GraphQL Configuration (minimal)
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true, // Enable for testing
      introspection: true,
    }),
  ],
  controllers: [HealthController],
  providers: [TestResolver],
})
export class AppModule {}