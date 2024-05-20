import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsersTable1713246416920 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'first_name',
          type: 'varchar'
        },
        {
          name: 'last_name',
          type: 'varchar'
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true
        },
        {
          name: 'password',
          type: 'varchar'
        },
        {
          name: 'status',
          type: 'enum',
          enum: ['active', 'inactive'],
          default: `'inactive'`
        },
        {
          name: 'credits',
          type: 'int',
          default: 0
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: `CURRENT_TIMESTAMP`
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: `CURRENT_TIMESTAMP`
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
    await queryRunner.dropTable('users')
  }
}
