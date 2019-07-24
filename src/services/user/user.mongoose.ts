// Defines Mongoose model for service `user`. (Can be re-generated.)
import merge from 'lodash.merge';
import mongoose from 'mongoose';
// !code: imports // !end
// !code: init // !end

const moduleExports = merge(
  {},
  // !code: model
  {
    cognitoId: String,
    email: String,
    name: {
      type: String,
      minLength: 3,
      maxLength: 40,
    },
    password: String,
    roleIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    activeWorkspace: String,
  },
  // !end
  // !code: moduleExports // !end
);

// !code: exports // !end
export default moduleExports;

// !code: funcs // !end
// !code: end // !end
