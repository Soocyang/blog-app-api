import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Common {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ default: 'SYSTEM' })
  created_by: string

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  modified_at: Date
  
}