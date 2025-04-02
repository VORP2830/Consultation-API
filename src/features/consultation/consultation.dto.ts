import { ApiProperty } from '@nestjs/swagger';
import { ConsultationStatus } from 'src/enums/consultation-statu.enum';

export class ConsultationDto {
  @ApiProperty({ example: 1 })
  clientId: number;

  @ApiProperty({ example: 2 })
  professionalId: number;

  @ApiProperty({ example: '2025-04-10T14:30:00Z', format: 'date-time' })
  date: Date;

  @ApiProperty({ enum: ConsultationStatus, example: ConsultationStatus.AGENDADA, default: ConsultationStatus.AGENDADA, })
  status: ConsultationStatus;
}
