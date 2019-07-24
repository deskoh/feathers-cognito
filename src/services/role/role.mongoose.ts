
/* tslint:disable:quotemark */
// Defines Mongoose model for service `role`. (Can be re-generated.)
import merge from 'lodash.merge';
// !code: imports // !end
// !code: init // !end

const moduleExports = merge(
  {},
  // !<DEFAULT> code: model
  {
    name: {
      type: String,
      minLength: 1,
      maxLength: 24,
      required: true,
    },
  },
  // !end
  // !code: moduleExports // !end
);

// !code: exports // !end
export default moduleExports;

// !code: funcs // !end
// !code: end // !end
