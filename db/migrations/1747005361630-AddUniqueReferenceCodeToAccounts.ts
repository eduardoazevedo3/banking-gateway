import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueReferenceCodeToAccounts1747005361630
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`-- sql
      CREATE UNIQUE INDEX idx_accounts_reference_code ON accounts (reference_code);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`-- sql
      DROP INDEX idx_accounts_reference_code ON accounts;
    `);
  }
}
