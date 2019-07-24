
// Hooks for service `role`. (Can be re-generated.)
import { HooksObject } from '@feathersjs/feathers';
import { hooks as authHooks } from '@feathersjs/authentication';
import * as commonHooks from 'feathers-hooks-common';

// !code: imports
import currentUserRoles from './hooks/currentUserRoles';
// !end

// !code: used
const { disallow } = commonHooks;
const { authenticate } = authHooks;
// const { create, update, patch, validateCreate, validateUpdate, validatePatch } = validate;
// !end

// !code: init // !end

const moduleExports: HooksObject = {
  before: {
    // !code: before
    all: [],
    find: [authenticate('jwt'), currentUserRoles],
    get: [disallow('external')],
    create: [disallow('external')],
    update: [disallow('external')],
    patch: [disallow('external')],
    remove: [disallow('external')],
    // !end
  },

  after: {
    // !code: after
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
    // !end
  },

  error: {
    // !code: error
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
    // !end
  },
  // !code: moduleExports // !end
};

// !code: exports // !end
export default moduleExports;

// !code: funcs // !end
// !code: end // !end
