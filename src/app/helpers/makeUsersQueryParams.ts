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

  if (queryParams.externalId) {
    if (typeof queryParams.externalId === 'string') {
      queryParams.externalId = queryParams.externalId.split(',');
    }
    queryParts.push(`${alias}.externalId IN (:...externalIds)`);
    params['externalIds'] = queryParams.externalId;
  }

  if (queryParams.lastName) {
    queryParts.push(`${alias}.lastName = :lastName`);
    params['lastName'] = queryParams.lastName;
  }
  if (queryParams.email) {
    queryParts.push(`${alias}.email = :email`);
    params['email'] = queryParams.email;
  }
  if (queryParams.phone) {
    queryParts.push(`${alias}.email = :phone`);
    params['phone'] = queryParams.phone;
  }
  if (queryParams.username) {
    queryParts.push(`${alias}.username = :username`);
    params['username'] = queryParams.username;
  }
  if (queryParams.tempPassword) {
    queryParts.push(`${alias}.tempPassword = :tempPassword`);
    params['tempPassword'] = queryParams.tempPassword;
  }

  if (queryParams.password !== undefined) {
    if (queryParams.password === null) {
      queryParts.push(`${alias}.password IS NULL`);
    } else {
      queryParts.push(`${alias}.password = :password`);
      params['password'] = queryParams.password;
    }
  }

  if ('organizationId' in queryParams) {
    if (queryParams.organizationId === null || queryParams.organizationId === undefined) {
      queryParts.push(`${alias}.organizationId is null`);
    } else {
      queryParts.push(`${alias}.organizationId = :organizationId`);
      params['organizationId'] = queryParams.organizationId;
    }
  }
  if (queryParams.verifiedAt !== undefined) {
    if (queryParams.verifiedAt === null) {
      queryParts.push(`${alias}.verifiedAt IS NULL`);
    } else {
      queryParts.push(`${alias}.verifiedAt = :verifiedAt`);
      params['verifiedAt'] = queryParams.verifiedAt;
    }
  }

  if (queryParams.isVerified) {
    queryParts.push(`${alias}.verifiedAt is not null`);
    params['isVerified'] = queryParams.isVerified;
  }

  if ('isOwner' in queryParams) {
    if (typeof queryParams.isOwner !== 'boolean') {
      queryParams.isOwner = queryParams.isOwner === 'true';
    }
    params['isOwner'] = queryParams.isOwner;
    queryParts.push(`${alias}.isOwner = :isOwner`);
  }

  if (queryParams.cnic) {
    queryParts.push(`${alias}.cnic = :cnic`);
    params['cnic'] = queryParams.cnic;
  }

  if (queryParams.isActive) {
    if (typeof queryParams.isActive !== 'boolean') {
      queryParams.isActive = queryParams.isActive === 'true';
    }
    params['isActive'] = queryParams.isActive;
    queryParts.push(`${alias}.isActive = :isActive`);
  }

  if (queryParams.searchOnAttributes) {
    const searchingAttributes = queryParams.searchOnAttributes.split(',');
    const orQueryParts: string[] = [];
    for (const attribute of searchingAttributes) {
      orQueryParts.push(`${alias}.${attribute} like :searchValue`);
    }
    queryParts.push(`(${orQueryParts.join(' OR ')})`);
    params['searchValue'] = `%${queryParams.searchValue}%`;
  }
  query = queryParts.join(' AND ');
  return { query, params };
};

export { makeUsersQueryParams as MakeUsersQueryParams };
