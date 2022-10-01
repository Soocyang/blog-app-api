import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export const connectDB = async () => {
  return await open({
    filename: 'database/blog.db',
    driver: sqlite3.Database
  })
}