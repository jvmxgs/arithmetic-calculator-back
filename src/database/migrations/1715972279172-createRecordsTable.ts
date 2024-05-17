import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateRecordsTable1715972279172 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'records',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'operation_id',
          type: 'int',
          isNullable: false
        },
        {
          name: 'user_id',
          type: 'int',
          isNullable: false
        },
        {
          name: 'amount',
          type: 'varchar'
        },
        {
          name: 'user_balance',
          type: 'varchar'
        },
        {
          name: 'operation_response',
          type: 'varchar'
        },
        {
          name: 'date',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP'
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
          isNullable: true
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
          isNullable: true
        },
        {
          name: 'deleted_at',
          type: 'timestamp',
          isNullable: true
        }
      ]
    }))

    await queryRunner.createForeignKey('records', new TableForeignKey({
      columnNames: ['operation_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'operations',
      onDelete: 'CASCADE'
    }))

    await queryRunner.createForeignKey('records', new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('records')
  }
}
