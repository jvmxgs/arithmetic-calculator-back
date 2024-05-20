import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateOperations1715928583907 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'operations',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'type',
          type: 'varchar',
          isUnique: true
        },
        {
          name: 'cost',
          type: 'int',
          default: 0
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: `CURRENT_TIMESTAMP`,
          isNullable: true
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: `CURRENT_TIMESTAMP`,
          isNullable: true
        },
        {
          name: 'deleted_at',
          type: 'timestamp',
          isNullable: true
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('operations')
  }
}
