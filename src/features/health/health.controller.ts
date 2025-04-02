import { Controller, Get } from '@nestjs/common';
import { HealthService } from 'src/features/health/health.service';

@Controller('api/health')
export class HealthController {
  constructor(private readonly service: HealthService) { }

  @Get()
  async get(): Promise<string> {
    return await this.service.get();
  }
}
