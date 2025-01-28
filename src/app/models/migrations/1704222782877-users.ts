import { MigrationInterface, QueryRunner } from 'typeorm';
import { database } from '../../../config/index.js';

export class Users1704222782877 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE ${database.schema}.users (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL CHECK (LENGTH(first_name) >= 1),
            last_name VARCHAR(255) NOT NULL CHECK (LENGTH(last_name) >= 1),
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            deleted_at TIMESTAMP DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users;`);
  }
}
