import { ApiProperty } from '@nestjs/swagger';

export class ConsultationFilter {
    @ApiProperty({ required: false, type: String })
    professionalId?: number;

    @ApiProperty({ required: false, type: String })
    clientId?: number;

    @ApiProperty({ required: false, type: String })
    status?: string;
}
