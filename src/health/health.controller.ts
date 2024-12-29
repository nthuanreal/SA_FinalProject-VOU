import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth(): string {
    return this.healthService.getHealth();
  }
}
