import Model from '../config/db/model';
import { PostSchema } from '../interfaces';
import { TableName } from '../types/posts';

export default class PostModel extends Model<TableName, PostSchema> {
  constructor() {
    super('POST')
  }
} 

