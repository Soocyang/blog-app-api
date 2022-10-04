import { connectDB } from './connection'
import { v4 as uuid } from 'uuid';
import { Pagination } from '../../types/db.types';

export default class Model<TableName, TableSchema> {
  readonly table: string
  constructor(tableName: TableName) {
    this.table = (tableName as string).toLowerCase()
  }

  async find(filter: Partial<TableSchema>, project: Array<keyof TableSchema>, pagination: Pagination) {
    const conditions = this.toConditions(filter)
    const db = await connectDB()
    let statement = `
    SELECT ${project.join(',')} 
    FROM ${this.table} 
    ${conditions && 'WHERE ' + conditions}
    ${pagination.limit && 'LIMIT ' + pagination.limit}
    ${pagination.offset && 'OFFSET ' + pagination.offset}
    `
    return await db.all<TableSchema>(statement)
  }

  async findOne(filter: Partial<TableSchema>, project?: Array<keyof TableSchema>) {
    const conditions = this.toConditions(filter)
    const db = await connectDB()
    let statement = `
    SELECT ${project ? project.join(',') : '*'} 
    FROM ${this.table} 
    ${conditions && 'WHERE ' + conditions}
    `
    return await db.get<TableSchema>(statement)
  }

  async insertOne(payload: Partial<TableSchema>) {
    const db = await connectDB()
    let insertPayload = { id: uuid(), ...payload}
    const [cols, values] = this.toColumnsAndValues(insertPayload)
    return await db.run(`INSERT INTO ${this.table} (${cols}) VALUES (${values})`)
  }

  async update(filter: Partial<TableSchema>, payload: Partial<TableSchema>) {
    const db = await connectDB()
    const values = this.toValues(payload)
    const conditions = this.toConditions(filter)
    const query = `
      UPDATE ${this.table} 
      SET ${values} 
      ,modified_at=DATETIME('NOW')
      ${conditions && 'WHERE ' + conditions}
    `
    return await db.run(query)
  }

  async deleteOne(id: string) {
    const db = await connectDB()
    return await db.run(`DELETE FROM ${this.table} WHERE id = '${id}'`)
  }

  private toColumnsAndValues(payload: Partial<TableSchema>): [cols: string, values: string] {
    const SEPERATOR = ','
    let cols = '', values = ''
    for (const [key, value] of Object.entries(payload)) {
      cols += `${key}${SEPERATOR}`
      values += `'${value}'${SEPERATOR}`
    }
    return [cols.substring(0, cols.length - 1), values.substring(0, values.length - 1)]
  }

  private toConditions(payload: Partial<TableSchema>) {
    const SEPERATOR = ' AND '
    let conditions = ''
    for (const [key, value] of Object.entries(payload)) {
      conditions += `${key}='${value}'${SEPERATOR}`
    }
    return conditions.substring(0, conditions.length - SEPERATOR.length)
  }

  private toValues(payload: Partial<TableSchema>){
    const SEPERATOR = ','
    let values = ''
    for (const [key, value] of Object.entries(payload)) {
      values += `${key}='${value}'${SEPERATOR}`
    }
    return values.substring(0, values.length - SEPERATOR.length)
  }
}