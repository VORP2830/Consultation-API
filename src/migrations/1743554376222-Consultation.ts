import { MigrationInterface, QueryRunner } from "typeorm";

export class Consultation1743554376222 implements MigrationInterface {
    name = 'Consultation1743554376222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."consultation_status_enum" AS ENUM('agendada', 'realizada', 'cancelada')
        `);
        await queryRunner.query(`
            CREATE TABLE "consultation" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "clientId" integer NOT NULL,
                "professionalId" integer NOT NULL,
                "date" TIMESTAMP NOT NULL,
                "status" "public"."consultation_status_enum" NOT NULL DEFAULT 'agendada',
                CONSTRAINT "PK_5203569fac28a4a626c42abe70b" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "consultation"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."consultation_status_enum"
        `);
    }

}
