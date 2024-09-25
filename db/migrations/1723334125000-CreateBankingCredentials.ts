import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBankingCredentials1723334125000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE banking_credentials (
        id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        account_id VARCHAR(64) NOT NULL,
        reference_code VARCHAR(64) NOT NULL,
        app_key VARCHAR(255),
        client_id VARCHAR(255),
        client_secret VARCHAR(255),
        created_at DATETIME(3) NOT NULL DEFAULT now(3),
				updated_at DATETIME(3) NOT NULL DEFAULT now(3),
        INDEX idx_banking_credentials_account_id (account_id),
        UNIQUE INDEX idx_banking_credentials_account_id_reference_code (account_id, reference_code)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE banking_credentials;
    `);
  }
}
