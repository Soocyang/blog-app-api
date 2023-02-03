import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { PaginationQuery } from "./PaginationQuery"

@Entity()
export class Common extends PaginationQuery {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: 'SYSTEM' })
  created_by: string

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  modified_at: Date
  
}