import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomes1722730660526 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE customers (
        id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        created_at DATETIME(3) NOT NULL DEFAULT now(3),
        updated_at DATETIME(3) NOT NULL DEFAULT now(3)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE customers
    `);
  }
}
