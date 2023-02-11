
import { DateTime } from "luxon";
import { Between, Like } from "typeorm";
import { convertBoolean } from "./convertBoolean";

interface QueryType {
  [key: string]: any
}

type FilterInfo<Entity> = {
  [key in keyof Entity]: 'regex' | 'exact' | 'datetime' | 'boolean';
};

type Filters<Entity> = {
  [key in keyof FilterInfo<Entity>]: any;
};


export function generateFilters<Query extends QueryType>(query: Query, fields: FilterInfo<Query>): Query {
  let updated = {}
  for (const key in fields) {
    if (!Object.keys(query).includes(key)) continue

    const value = query[key];
    let filterValue: unknown = value;

    if (fields[key] === 'regex') {
      filterValue = Like(`%${value}%`)
    }

    if (fields[key] === 'datetime') {
      const [start, end] = value.split(',')
      filterValue = Between(DateTime.fromISO(start).toJSDate(), DateTime.fromISO(end).toJSDate())
    }

    if (fields[key] === 'boolean') {
      filterValue = convertBoolean(value)
    }
    Object.assign(updated, { [key]: filterValue })
  }
  return updated as Query
}
