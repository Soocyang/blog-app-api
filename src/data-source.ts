import { DataSource } from "typeorm"
import * as path from "path"

import { Post } from "./entity/Post"
import { Tag } from "./entity/Tag"

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: `${path.resolve(__dirname, "..")}/database/blog.db`,
  entities: [
    Post,
    Tag,
  ],
  synchronize: true,
  logging: false,
})

