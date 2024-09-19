import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBoletos1723334125127 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			CREATE TABLE boletos (
				id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
				account_id VARCHAR(64) NOT NULL,
				reference_code VARCHAR(64) NOT NULL,
				our_number VARCHAR(255) NOT NULL,
				status VARCHAR(255) NOT NULL DEFAULT 'PENDING',
				issuing_bank VARCHAR(255) NOT NULL,
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
				created_at DATETIME(3) NOT NULL DEFAULT now(3),
				updated_at DATETIME(3) NOT NULL DEFAULT now(3)
			)
		`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE boletos`);
  }
}
