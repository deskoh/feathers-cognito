
// Hooks for service `user`. (Can be re-generated.)
import { HooksObject } from '@feathersjs/feathers';
import { hooks as authHooks } from '@feathersjs/authentication';
import { hooks as localAuthHooks } from '@feathersjs/authentication-local';

// !code: imports
// import * as commonHooks from 'feathers-hooks-common';
import currentUser from './hooks/current-user';
import setupNewUser from './hooks/setupNewUser';
// import filterUserList from './hooks/filterUserList';
// import userResolvers from './userResolvers';
// !end

// !code: used
const { hashPassword, protect } = localAuthHooks;
const { authenticate } = authHooks;
// const {
//   fastJoin, iff, isProvider,
// } = commonHooks;
// !end

// !code: init // !end

const moduleExports: HooksObject = {
  before: {
    // !code: before
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt'), currentUser],
    create: [hashPassword(), setupNewUser],
    update: [hashPassword(), authenticate('jwt')],
    patch: [hashPassword(), authenticate('jwt')],
    remove: [authenticate('jwt')],
    // !end
  },

  after: {
    // !code: after
    all: [protect('password')],
    find: [/* iff(isProvider('external'), fastJoin(userResolvers)) */],
    get: [],
    create: [],
    update: [],
    patch: [/* iff(isProvider('external'), fastJoin(userResolvers)) */],
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
