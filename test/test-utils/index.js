// Modified from @feathers-plus/test-utils@0.3.6 to support test for custom auth.

const cli = require('./cli');
const doesFileExist = require('./does-file-exist');
const localStorage = require('./local-storage');
const loginJwt = require('./login-jwt');
const loginAnonymous = require('./login-anonymous');
const makeClient = require('./make-client');
const readJsonFileSync = require('./read-json-file-sync');

module.exports = Object.assign({},
  {
    doesFileExist,
    localStorage,
    loginAnonymous,
    loginJwt,
    makeClient,
    readJsonFileSync,
  },
  cli);
