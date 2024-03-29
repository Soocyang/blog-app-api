import { Pagination } from "../interfaces"

export const toFiltersPagination = <Query extends Pagination>(payload: Query) => {
  const filter = payload
  const limit = payload?.limit || '10'
  const pagination = {
    limit,
    offset: getOffset(limit, payload?.page || '1').toString(),
  }
  delete filter.limit
  delete filter.offset
  return { filter, pagination }
}

const getOffset = (limit: string, page: string) => {
  return (parseInt(page) - 1) * parseInt(limit)
} 