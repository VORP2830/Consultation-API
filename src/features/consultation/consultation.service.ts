import { Injectable, NotFoundException } from '@nestjs/common';
import { PostgresDataSource } from 'src/config/postgres.config';
import { PageList, PageParams } from 'src/shared/pagination';
import { ILike, Repository } from 'typeorm';
import { ConsultationFilter } from './consultation.filter';
import { Consultation } from 'src/models/consultation.entity';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const PROFESSIONAL_URL = process.env.PROFESSIONAL_URL;
const CLIENT_URL = process.env.CLIENT_URL;

@Injectable()
export class ConsultationService {
  private readonly consultationRepository: Repository<Consultation>;

  constructor() {
    this.consultationRepository = PostgresDataSource.getRepository(Consultation);
  }

  async get(pageParams: PageParams, filter: ConsultationFilter ): Promise<PageList<Consultation>> {
    const { pageNumber, pageSize } = new PageParams(pageParams);
    const { status, professionalId, clientId } = filter;

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (professionalId) {
      where.professionalId = professionalId;
    }

    if (clientId) {
      where.clientId = clientId;
    }

    const [items, count] = await this.consultationRepository.findAndCount({
      where,
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      order: { date: 'ASC' },
    });

    return new PageList(items, count, pageNumber, pageSize);
  }

  async getById(id: number): Promise<Consultation> {
    const consultation = await this.consultationRepository.findOne({
      where: { id },
    });

    if (!consultation) {
      throw new NotFoundException('Consulta não encontrada');
    }

    return consultation;
  }

  async create(data: Consultation): Promise<Consultation> {
    await this.validateProfessionalAndClient(data.professionalId, data.clientId);
    const newConsultation = this.consultationRepository.create(data);
    return await this.consultationRepository.save(newConsultation);
  }

  async update(id: number, data: Consultation): Promise<Consultation> {
    const existing = await this.getById(id);
    await this.validateProfessionalAndClient(data.professionalId, data.clientId);
    Object.assign(existing, data);
    return await this.consultationRepository.save(existing);
  }

  async updateStatus(id: number, status: string): Promise<Consultation> {
    const consultation = await this.getById(id);
    consultation.status = status as any;
    return await this.consultationRepository.save(consultation);
  }

  async delete(id: number): Promise<void> {
    const consultation = await this.getById(id);
    await this.consultationRepository.softRemove(consultation);
  }

  private async checkIfProfessionalExists(professionalId: number): Promise<boolean> {
    try {
      const exists = await axios.get(`${PROFESSIONAL_URL}/api/professional/${professionalId}`);
      return exists.status === 200;
    } catch (err) {
      return false;
    }
  }
  
  private async checkIfClientExists(clientId: number): Promise<boolean> {
    try {
      const exists = await axios.get(`${CLIENT_URL}/api/client/${clientId}`);
      return exists.status === 200;
    } catch (err) {
      return false;
    }
  }

  private async validateProfessionalAndClient(professionalId: number, clientId: number): Promise<void> {
    const professionalExists = await this.checkIfProfessionalExists(professionalId);
    if (!professionalExists) {
      throw new NotFoundException(`Profissional não encontrado`);
    }

    const clientExists = await this.checkIfClientExists(clientId);
    if (!clientExists) {
      throw new NotFoundException(`Cliente não encontrado`);
    }
  }
}
