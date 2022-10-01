import { connectDB } from './connection'
import { v4 as uuid } from 'uuid';
import { PostSchema } from '../../types/db.types';

export default class Model<TableName> {
  readonly table: string
  constructor(tableName: TableName) {
    this.table = (tableName as string).toLowerCase()
  }

  async find() {
    const db = await connectDB()
    return await db.all<PostSchema>(`SELECT * FROM ${this.table}`)
  }

  async insertOne(payload: any) {
    const db = await connectDB()

    let cols = 'id,'
    let values = `'${uuid()}',`
    for (const [key, value] of Object.entries(payload)) {
      cols += `${key},`
      values += `'${value}',`
    }

    cols = cols.substring(0, cols.length - 1)
    values = values.substring(0, values.length - 1)

    return await db.run(`INSERT INTO ${this.table} (${cols}) VALUES (${values})`)
  }

  findOne() {
    console.log('findOne')
  }
  updateOne() {
    console.log('updateOne')
  }
  deleteOne() {
    console.log('deleteOne')
  }
}