import { Entity, Column } from "typeorm"
import { Common } from "./Common"

@Entity()
export class Tag extends Common {
  @Column()
  code: string

  @Column({ nullable: true })
  display_text?: string

  @Column({ nullable: true })
  color?: string
}