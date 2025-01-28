const makeUsersQueryParams = (queryParams: any, alias: string) => {
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
  if (queryParams.firstName) {
    queryParts.push(`${alias}.firstName = :firstName`);
    params['firstName'] = queryParams.firstName;
  }

  if (queryParams.lastName) {
    queryParts.push(`${alias}.lastName = :lastName`);
    params['lastName'] = queryParams.lastName;
  }

  if (queryParams.email) {
    queryParts.push(`${alias}.email = :email`);
    params['email'] = queryParams.email;
  }

  if (queryParams.password !== undefined) {
    if (queryParams.password === null) {
      queryParts.push(`${alias}.password IS NULL`);
    } else {
      queryParts.push(`${alias}.password = :password`);
      params['password'] = queryParams.password;
    }
  }
  query = queryParts.join(' AND ');
  return { query, params };
};

export { makeUsersQueryParams as MakeUsersQueryParams };
