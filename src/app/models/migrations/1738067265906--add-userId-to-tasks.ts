import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddUserIdToTasks1738067265906 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add the 'userId' column to the 'tasks' table
    await queryRunner.addColumn(
      'tasks',
      new TableColumn({
        name: 'userId',
        type: 'int',
        isNullable: true, // Set to true if tasks can exist without a user
      }),
    );

    // Create a foreign key relationship with the 'users' table
    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        columnNames: ['userId'], // Column in 'tasks' table
        referencedColumnNames: ['id'], // Column in 'users' table
        referencedTableName: 'users', // Target table
        onDelete: 'SET NULL', // Action on delete (e.g., SET NULL, CASCADE, etc.)
        onUpdate: 'CASCADE', // Action on update
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Get the foreign key to drop it
    const table = await queryRunner.getTable('tasks');
    const foreignKey = table?.foreignKeys.find((fk) => fk.columnNames.indexOf('userId') !== -1);

    if (foreignKey) {
      await queryRunner.dropForeignKey('tasks', foreignKey);
    }

    // Drop the 'userId' column
    await queryRunner.dropColumn('tasks', 'userId');
  }
}
