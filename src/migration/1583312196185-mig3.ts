import {MigrationInterface, QueryRunner} from "typeorm";

export class mig31583312196185 implements MigrationInterface {
    name = 'mig31583312196185'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `journey` CHANGE `created_at` `created_at` datetime NULL", undefined);
        await queryRunner.query("ALTER TABLE `journey` CHANGE `started_at` `started_at` datetime NULL", undefined);
        await queryRunner.query("ALTER TABLE `journey` CHANGE `ended_at` `ended_at` datetime NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `journey` CHANGE `ended_at` `ended_at` datetime NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `journey` CHANGE `started_at` `started_at` datetime NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `journey` CHANGE `created_at` `created_at` datetime NOT NULL", undefined);
    }

}
