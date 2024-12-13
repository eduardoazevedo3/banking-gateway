import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBoletos1723334125127 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`-- sql
			CREATE TABLE boletos (
				id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
				account_id BIGINT NOT NULL,
				covenant_id VARCHAR(64) NOT NULL,
				reference_code VARCHAR(64),
				our_number VARCHAR(64) NOT NULL,
				status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
				issuing_bank VARCHAR(50) NOT NULL,
				issue_data JSON NOT NULL,
				issue_date DATE NOT NULL,
				due_date DATE NOT NULL,
				amount DECIMAL(10, 2) NOT NULL,
				discount_amount DECIMAL(10, 2),
				fine_amount DECIMAL(10, 2),
				interest_amount DECIMAL(10, 2),
				fee_amount DECIMAL(10, 2),
				protest_days INT,
				negativation_days INT,
				negativation_agency VARCHAR(255),
				receipt_days_limit INT,
				boleto_type_code VARCHAR(255),
				boleto_type_description VARCHAR(255),
				beneficiary_type VARCHAR(255) NOT NULL,
				beneficiary_document VARCHAR(255) NOT NULL,
				beneficiary_name VARCHAR(255) NOT NULL,
				payer_type VARCHAR(255) NOT NULL,
				payer_document VARCHAR(255) NOT NULL,
				payer_name VARCHAR(255) NOT NULL,
				payer_address VARCHAR(255) NOT NULL,
				payer_address_number VARCHAR(20) NOT NULL,
				payer_zip_code VARCHAR(255) NOT NULL,
				payer_city VARCHAR(255) NOT NULL,
				payer_neighborhood VARCHAR(255) NOT NULL,
				payer_state VARCHAR(255) NOT NULL,
				payer_phone VARCHAR(255) NOT NULL,
				rejection_reason TEXT,
				barcode VARCHAR(64),
				digitable_line VARCHAR(64),
				billing_contract_number VARCHAR(64),
				created_at DATETIME(3) NOT NULL DEFAULT now(3),
				updated_at DATETIME(3) NOT NULL DEFAULT now(3),
				registered_at DATETIME(3),
				INDEX idx_boletos_account_id (account_id),
				UNIQUE INDEX idx_boletos_account_id_covenant_id_our_number (account_id, covenant_id, our_number),
				UNIQUE INDEX idx_boletos_account_id_reference_code (account_id, reference_code),
				CONSTRAINT fk_boletos_account_id FOREIGN KEY (account_id) REFERENCES accounts (id)
			)
		`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`-- sql
      DROP TABLE boletos;
    `);
  }
}
