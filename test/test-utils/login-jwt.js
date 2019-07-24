
module.exports = async function loginJwt(appClient, accessToken) {
  try {
    return await appClient.authenticate({
      strategy: 'jwt',
      accessToken,
    });
  } catch (err) {
    throw err;
  }
};
