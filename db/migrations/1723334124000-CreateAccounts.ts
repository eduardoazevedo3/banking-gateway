import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccounts1723334124000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`-- sql
      CREATE TABLE accounts (
        id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        provider_account_id VARCHAR(64) NOT NULL,
        reference_code VARCHAR(64),
        description VARCHAR(255) NOT NULL,
        document_type VARCHAR(10) NOT NULL,
        document_number VARCHAR(50) NOT NULL,
        credentials TEXT,
        created_at DATETIME(3) NOT NULL DEFAULT now(3),
				updated_at DATETIME(3) NOT NULL DEFAULT now(3),
        UNIQUE INDEX idx_accounts_provider_account_id (provider_account_id),
        UNIQUE INDEX idx_accounts_provider_account_document_type_number (provider_account_id, document_type, document_number)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`-- sql
      DROP TABLE accounts;
    `);
  }
}
