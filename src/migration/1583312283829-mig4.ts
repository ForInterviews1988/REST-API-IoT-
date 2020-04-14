import {MigrationInterface, QueryRunner} from "typeorm";

export class mig41583312283829 implements MigrationInterface {
    name = 'mig41583312283829'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `journey` CHANGE `composition` `composition` text NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `journey` CHANGE `composition` `composition` text NOT NULL", undefined);
    }

}
