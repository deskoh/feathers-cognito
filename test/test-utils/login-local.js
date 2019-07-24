
module.exports = async function loginLocal(appClient, _id, password) {
  try {
    return await appClient.authenticate({
      strategy: 'local',
      _id,
      password,
    });
  } catch (err) {
    throw err;
  }
};
