import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnToAccounts1746395279727 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`-- sql
      ALTER TABLE accounts
      ADD COLUMN amount_adjustments JSON
      AFTER issue_data;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`-- sql
      ALTER TABLE accounts
      DROP COLUMN amount_adjustments;
    `);
  }
}
