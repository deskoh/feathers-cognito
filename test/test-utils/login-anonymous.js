
module.exports = async function loginAnonymous(appClient) {
  try {
    return await appClient.authenticate({
      strategy: 'anonymous',
    });
  } catch (err) {
    throw err;
  }
};
