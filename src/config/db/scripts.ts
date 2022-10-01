export const POSTS_TABLE_SCRIPTS = `
CREATE TABLE IF NOT EXISTS post ( 
  id TEXT PRIMARY KEY, 
  title TEXT, 
  meta_title TEXT, 
  content TEXT, 
  summary TEXT, 
  is_published TINYINT(1), 
  published_at DATETIME, 
  created_at DEFAULT CURRENT_TIMESTAMP, 
  modified_at DEFAULT CURRENT_TIMESTAMP 
)
`

export const INSERT_SCRIPTS = `
INSERT INTO post (
  id, 
  title, 
  meta_title, 
  content, 
  summary, 
  is_published, 
  published_at, 
  created_at, 
  modified_at
) VALUES(
  '{idaa}', 
  '{title}',
  'meta_title',
  'content',
  'summary',
  'is_published',
  'published_at',
  'created_at',
  'modified_at'
  )
`

export const FETCH_POSTS = `
SELECT * 
FROM post
`