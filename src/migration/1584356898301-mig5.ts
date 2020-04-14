import {MigrationInterface, QueryRunner} from "typeorm";

export class mig51584356898301 implements MigrationInterface {
    name = 'mig51584356898301'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` ADD `role` varchar(255) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `role`", undefined);
    }

}
