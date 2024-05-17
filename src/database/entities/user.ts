import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { UserStatus } from '../../enums/userStatus'
import { Record } from './record'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
    id!: number

  @Column()
    first_name!: string

  @Column()
    last_name!: string

  @Column()
    email!: string

  @Column()
    password!: string

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.active
  })
    status!: UserStatus

  @Column()
    credits!: number

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    created_at!: Date

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updated_at!: Date

  @Column({ nullable: true })
    deleted_at!: Date

  @OneToMany(() => Record, record => record.user)
    records!: Record[]
}
