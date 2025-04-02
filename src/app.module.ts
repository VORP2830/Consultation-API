import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresDataSource } from './config/postgres.config';
import { HealthModule } from './features/health/health.module';
import { Consultation } from './models/consultation.entity';
import { ConsultationModule } from './features/consultation/consultation.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(PostgresDataSource.options),
    TypeOrmModule.forFeature([Consultation]),
    HealthModule,
    ConsultationModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
