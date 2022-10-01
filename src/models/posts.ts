import Model from '../config/db/model';
import { PostSchema, TableName } from '../types/db.types';

export default class PostModel extends Model<TableName> {
  constructor() {
    super('POST')
  }
} 

