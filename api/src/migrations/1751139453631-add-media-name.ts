import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMedia1751139453631 implements MigrationInterface {
    name = 'AddMedia1751139453631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "name"`);
    }

}
