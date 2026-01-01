import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Clean and validate FRONTEND_URL
  const frontendUrl = process.env.FRONTEND_URL?.trim() || 'http://localhost:5173';
  
  // Enable CORS for frontend communication
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://book-management-frontend-ten.vercel.app',
      frontendUrl
    ].filter(url => url && !url.includes('[') && !url.includes(']')), // Filter out invalid URLs
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
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
  console.log(`🔗 CORS enabled for: ${frontendUrl}`);
}

bootstrap();