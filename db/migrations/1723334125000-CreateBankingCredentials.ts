import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBankingCredentials1723334125000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE banking_credentials (
        id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        account_id BIGINT NOT NULL,
        reference_code VARCHAR(64),
        credentials TEXT,
        created_at DATETIME(3) NOT NULL DEFAULT now(3),
				updated_at DATETIME(3) NOT NULL DEFAULT now(3),
        INDEX idx_banking_credentials_account_id (account_id),
        UNIQUE INDEX idx_banking_credentials_account_id_reference_code (account_id, reference_code),
        CONSTRAINT fk_banking_credentials_account_id FOREIGN KEY (account_id) REFERENCES accounts (id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE banking_credentials;
    `);
  }
}
