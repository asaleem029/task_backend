const makeTaskQueryParams = (queryParams: any, alias: string) => {
  let query = '';
  const queryParts: string[] = [];
  const params: { [key: string]: string } = {};
  if (queryParams.id) {
    if (typeof queryParams.id == 'number') {
      queryParts.push(`${alias}.id = :id`);
      params['id'] = queryParams.id;
    } else {
      queryParts.push(`${alias}.id IN (:...ids)`);
      params['ids'] = queryParams.id.split(',');
    }
  }
  if (queryParams.name) {
    queryParts.push(`${alias}.name = :name`);
    params['name'] = queryParams.name;
  }

  if (queryParams.description) {
    queryParts.push(`${alias}.description = :description`);
    params['description'] = queryParams.description;
  }

  if (queryParams.userId) {
    queryParts.push(`${alias}.userId = :userId`);
    params['userId'] = queryParams.userId;
  }
  query = queryParts.join(' AND ');
  return { query, params };
};

export { makeTaskQueryParams as MakeTaskQueryParams };
