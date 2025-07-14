import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveDocumentUniqueFromAccount1746395279107
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`-- sql
      ALTER TABLE accounts
      MODIFY provider_account_id VARCHAR(64) NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`-- sql
      ALTER TABLE accounts
      MODIFY provider_account_id VARCHAR(64) NOT NULL;
    `);
  }
}
