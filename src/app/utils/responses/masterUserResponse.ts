export function generateApiResponse(data: any, action = [], permissions = [], token = 'abc') {
  return {
    user: data,
    action: action,
    permissions: permissions,
    token: token,
  };
}
