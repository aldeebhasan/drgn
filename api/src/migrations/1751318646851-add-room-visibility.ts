import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoomVisibility1751318646851 implements MigrationInterface {
    name = 'AddRoomVisibility1751318646851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" ADD "is_public" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "media" ALTER COLUMN "name" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" ALTER COLUMN "name" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "is_public"`);
    }

}
