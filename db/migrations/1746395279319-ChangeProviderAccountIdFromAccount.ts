import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeProviderAccountIdFromAccount1746395279319
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`-- sql
      DROP INDEX idx_accounts_provider_account_document_type_number ON accounts;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`-- sql
      CREATE UNIQUE INDEX idx_accounts_provider_account_document_type_number ON accounts (
        provider_account_id,
        document_type,
        document_number
      );
    `);
  }
}
