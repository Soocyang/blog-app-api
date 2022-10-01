export type TableName = 'POST' | 'COMMENT' | 'POST_CATEGORY' | 'CATEGORY'

export interface PostSchema {
  id: string
  title?: string
  meta_title?: string
  content?: string
  summary?: string
  is_published?: boolean
  published_at?: Date
  created_at?: Date
  modified_at?: Date
}