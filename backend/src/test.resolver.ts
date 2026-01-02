import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class TestResolver {
  @Query(() => String)
  hello(): string {
    return 'Hello from GraphQL!';
  }
}