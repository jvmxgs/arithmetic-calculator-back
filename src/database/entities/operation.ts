import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('operations')
export class Operation {
  @PrimaryGeneratedColumn()
    id!: number

  @Column()
    type!: string

  @Column()
    cost!: number

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at!: Date

  @Column({ nullable: true })
    deleted_at!: Date
}
