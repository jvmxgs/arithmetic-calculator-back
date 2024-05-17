import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('operations')
export class Operation {
  @PrimaryGeneratedColumn()
    id!: number

  @Column()
    type!: string

  @Column()
    cost!: number

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    created_at!: Date

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updated_at!: Date

  @Column({ nullable: true })
    deleted_at!: Date
}
