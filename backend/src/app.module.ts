import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';

/**
 * Minimal application module for testing deployment
 */
@Module({
  controllers: [HealthController],
})
export class AppModule {}