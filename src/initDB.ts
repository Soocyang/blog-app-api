
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { CREATE_SCRIPTS } from './config'

(async () => {
  // open the database
  const db = await open({
    filename: 'database/blog.db',
    driver: sqlite3.Database
  })

  await db.exec(CREATE_SCRIPTS)
  console.info('successfully created table posts')
})()

