
const merge = require('lodash.merge');
const { join } = require('path');
const doesFileExist = require('../does-file-exist');

let initialized = false;

function expand(appRootPath, { overriddenAuth = {} }) {
  // Get specs from feathers-plus/cli generations.
  const specsPath = join(appRootPath, 'feathers-gen-specs.json');
  if (!doesFileExist(specsPath)) {
    return ['feathers-gen-specs.json not found. Cannot run test. (expandSpecsForTests)', {}];
  }

  const genSpecs = require(specsPath);

  // Add user-entity service's path
  const usersName = genSpecs.authentication.entity;
  const usersService = genSpecs.services[usersName];
  const usersPath = usersService ? usersService.path : undefined;
  if (!usersPath) {
    return [`Authentication's user-entity ${usersName}'s path has not been generated. (expandSpecsForTests)`, genSpecs];
  }

  genSpecs.authentication._entityPath = usersPath;

  // Define which methods have authentication
  genSpecs._authByMethod = {};

  Object.keys(genSpecs.services).forEach((name) => {
    const serviceSpec = genSpecs.services[name];
    if (serviceSpec.adapter !== 'custom') {
      const { isAuthEntity } = serviceSpec;
      const auth = isAuthEntity || serviceSpec.requiresAuth ? 'auth' : 'noauth';
      genSpecs._authByMethod[name] = {
        // create must be first
        create: isAuthEntity ? 'noauth' : auth, find: auth, get: auth, patch: auth, update: auth, remove: auth,
      };
    }
  });

  merge(genSpecs._authByMethod, overriddenAuth);

  // Move rest to end of providers
  const { providers } = genSpecs.app;
  const i = providers.indexOf('rest');
  if (i !== -1) {
    providers.splice(providers.length - 1, 0, providers.splice(i, 1)[0]);
  }

  return ['', genSpecs];
}

module.exports = function expandSpecsForTest(appRootPath, options = {}) {
  let err;
  let genSpecs;
  if (!initialized) {
    initialized = true;
    [err, genSpecs] = expand(appRootPath, options);
  }

  return { err, genSpecs };
};
