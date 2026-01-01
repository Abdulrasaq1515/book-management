import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Temporarily disable CORS to fix deployment issue
  // Will re-enable once app is running
  app.enableCors({
    origin: true, // Allow all origins temporarily
    credentials: true,
  });

  // Enable global validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have decorators
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );

  const port = process.env.PORT || 4000;
  await app.listen(port, '0.0.0.0'); // Listen on all interfaces for deployment
  
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📊 GraphQL endpoint available at /graphql`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
}

bootstrap();