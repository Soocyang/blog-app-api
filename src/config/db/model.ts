import { connectDB } from './connection'
import { v4 as uuid } from 'uuid';

export default class Model<TableName, TableSchema> {
  readonly table: string
  constructor(tableName: TableName) {
    this.table = (tableName as string).toLowerCase()
  }

  async find(filter: Partial<TableSchema>, project: Array<keyof TableSchema>) {
    const conditions = this.toConditions(filter)
    const db = await connectDB()
    let statement = `SELECT ${project.join(',')} FROM ${this.table} ${conditions && 'WHERE ' + conditions}`
    return await db.all<TableSchema>(statement)
  }

  async insertOne(payload: Partial<TableSchema>) {
    const db = await connectDB()
    const [cols, values] = this.toColumnsAndValues(payload)
    return await db.run(`INSERT INTO ${this.table} (${cols}) VALUES (${values})`)
  }

  async updateOne(payload: Partial<TableSchema>) {
    const db = await connectDB()
    const [cols, values] = this.toColumnsAndValues(payload)
    return await db.run(`INSERT INTO ${this.table} (${cols}) VALUES (${values})`)
  }

  async deleteOne(id: string) {
    const db = await connectDB()
    return await db.run(`DELETE FROM ${this.table} WHERE id = '${id}'`)
  }

  private toColumnsAndValues(payload: Partial<TableSchema>): [cols: string, values: string] {
    let cols = 'id,'
    let values = `'${uuid()}',`
    for (const [key, value] of Object.entries(payload)) {
      cols += `${key},`
      values += `'${value}',`
    }
    return [cols.substring(0, cols.length - 1), values.substring(0, values.length - 1)]
  }

  private toConditions(payload: Partial<TableSchema>) {
    const STATEMENT = ' AND '
    let conditions = ''
    for (const [key, value] of Object.entries(payload)) {
      conditions += `${key}='${value}'${STATEMENT}`
    }
    return conditions.substring(0, conditions.length - STATEMENT.length)
  }
}