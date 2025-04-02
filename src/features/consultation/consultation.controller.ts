import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { PageList, PageParams } from 'src/shared/pagination';
import { ConsultationFilter } from './consultation.filter';
import { Consultation } from 'src/models/consultation.entity';
import { ConsultationDto } from './consultation.dto';

@Controller('api/consultation')
export class ConsultationController {
  constructor(private readonly service: ConsultationService) {}

  @Get()
  async get(@Query() pageParams: PageParams, @Query() filter: ConsultationFilter ): Promise<PageList<Consultation>> {
    return await this.service.get(pageParams, filter);
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Consultation> {
    return await this.service.getById(id);
  }

  @Post()
  async create(@Body() body: ConsultationDto): Promise<Consultation> {
    return await this.service.create(body as Consultation);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: Consultation): Promise<Consultation> {
    return await this.service.update(id, body);
  }

  @Put(':id/carried')
  async marcarComoRealizada(@Param('id') id: number): Promise<Consultation> {
    return await this.service.updateStatus(id, 'realizada');
  }

  @Put(':id/canceled')
  async cancelar(@Param('id') id: number): Promise<Consultation> {
    return await this.service.updateStatus(id, 'cancelada');
  }

  @Put(':id/scheduled')
  async reagendar(@Param('id') id: number): Promise<Consultation> {
    return await this.service.updateStatus(id, 'agendada');
  }


  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.service.delete(id);
  }
}
