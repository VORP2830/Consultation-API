import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './middlewares/exception.middleware';
import { PostgresDataSource } from './config/postgres.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Consultation API')
    .setDescription('Documentação da API de consultas')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  app.use(
    '/scalar',
    apiReference({
      spec: {
        content: document,
      },
    })
  );

  await PostgresDataSource.initialize()
    .then(() => { 
      console.log('Postgres initialized')
    })
    .catch((error) => {
      console.error('Error initializing database connection: ', error);
    })

  await app.listen(3000);
}
bootstrap();
