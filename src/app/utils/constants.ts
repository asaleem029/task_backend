enum LANGUAGE {
  EN = 'EN',
  UR = 'UR',
  AR = 'AR',
  RU = 'RU',
}

const TOKEN_SECRET = 'MIIEpAIBAAKCAQEA4MQE6YpPLQ8K/VCoXGpTLLnmG5Gp3Ejhs6ZkP+FjYlOT1uvD';
const DEFAULT_PAGE_LIMIT = 10;
const DEFAULT_PAGE_NO = 1;
const DEFAULT_SORTING_ORDER = 'DESC';

type SortingOrder = 'ASC' | 'DESC';

enum SORTING_COLUMNS {
  ID = 'id',
  UPDATED_AT = 'updatedAt',
}

export {
  LANGUAGE as Language,
  DEFAULT_PAGE_LIMIT,
  DEFAULT_PAGE_NO,
  DEFAULT_SORTING_ORDER,
  SortingOrder,
  SORTING_COLUMNS,
  TOKEN_SECRET,
};
