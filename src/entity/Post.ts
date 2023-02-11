import { Entity, Column, ManyToMany, JoinTable } from "typeorm"
import { Common } from "./Common"
import { Tag } from "./Tag"

@Entity()
export class Post extends Common {
  @Column()
  title: string

  @Column({ nullable: true })
  meta_title?: string

  @Column()
  content: string

  @Column({ nullable: true })
  summary?: string

  @Column({ default: false })
  is_published: boolean

  @Column({ nullable: true })
  url_key?: string

  @Column({ default: 0 })
  likes?: number

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[]

}