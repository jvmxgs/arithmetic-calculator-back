import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { User } from './user'

@Entity('records')
export class Record {
  @PrimaryGeneratedColumn()
    id!: number

  @Column()
    operation_id!: number

  @Column()
    user_id!: number

  @Column()
    amount!: number

  @Column()
    user_balance!: number

  @Column()
    operation_response!: string

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    date!: Date

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    created_at!: Date

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updated_at!: Date

  @Column({ nullable: true })
    deleted_at!: Date

  @ManyToOne(() => User, user => user.records)
  @JoinColumn({ name: 'user_id' })
    user!: User
}
