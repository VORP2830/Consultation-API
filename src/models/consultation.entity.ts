import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ConsultationStatus } from 'src/enums/consultation-statu.enum';

@Entity()
export class Consultation extends BaseEntity {
    @Column()
    clientId: number;

    @Column()
    professionalId: number;

    @Column()
    date: Date;

    @Column({ type: 'enum', enum: ConsultationStatus, default: ConsultationStatus.AGENDADA, })
    status: ConsultationStatus;
}
