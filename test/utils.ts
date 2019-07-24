export const mockId = '123456789012345678901234';
export const getParams = function (byServer = true, authenticated = true) {
  const params = {
    provider: undefined,
    user: { _id: mockId },
    authenticated: true,
    data: undefined,
    query: undefined,
  };
  if (!authenticated) {
    delete params.user;
    delete params.authenticated;
  }
  if (!byServer) params.provider = 'xxx';
  return params;
};
