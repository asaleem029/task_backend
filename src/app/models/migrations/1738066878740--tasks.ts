import { database } from '../../../config/index.js';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tasks1738066878740 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE ${database.schema}.tasks (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL CHECK (LENGTH(name) >= 1),
            description VARCHAR(255) NOT NULL,
            deleted_at TIMESTAMP DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE tasks;`);
  }
}
