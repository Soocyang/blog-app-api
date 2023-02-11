import { Entity, Column, ManyToMany, JoinTable } from "typeorm"
import { Common } from "./Common"
import { Post } from "./Post"

@Entity()
export class Tag extends Common {
  @Column()
  code: string

  @Column({ nullable: true })
  display_text?: string

  @Column({ nullable: true })
  color?: string

  @ManyToMany(() => Post)
  @JoinTable()
  posts: Post[]
}