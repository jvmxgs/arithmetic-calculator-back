import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

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

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at!: Date

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at!: Date
}
