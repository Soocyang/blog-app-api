import { PostSchema } from "../interfaces"

export type TableName = 'POST' | 'COMMENT' | 'POST_CATEGORY' | 'CATEGORY'
export type KeyOfPostSchema = keyof PostSchema 