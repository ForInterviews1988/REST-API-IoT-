import {MigrationInterface, QueryRunner} from "typeorm";

export class mig61584359538621 implements MigrationInterface {
    name = 'mig61584359538621'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `role` `role` varchar(255) NOT NULL DEFAULT 'USER'", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `role` `role` varchar(255) NOT NULL", undefined);
    }

}
