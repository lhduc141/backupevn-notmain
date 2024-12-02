export type FindAllDto = FindWithKeywordDto & {
  pageIndex?: number;
  pageSize?: number;
};
export type FindWithKeywordDto = {
  keyword?: string;
};
