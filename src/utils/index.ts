export const hasMoreRec = (count: number, skip: number, limit: number): boolean =>
  count > skip + limit;