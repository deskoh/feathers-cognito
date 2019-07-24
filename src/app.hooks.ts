
// Application hooks that run for every service. (Can be re-generated.)
import { HooksObject } from '@feathersjs/feathers';
// !<DEFAULT> code: imports
import log from './hooks/log';
// !end

// !code: used
// const { iff } = commonHooks;
// !end
// !code: init // !end

const moduleExports: HooksObject = {
  before: {
    // !code: before
    all: [log()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
    // !end
  },

  after: {
    // !code: after
    all: [log()],
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
    all: [log()],
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
