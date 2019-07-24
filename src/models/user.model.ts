
// user-model.ts - A Mongoose model for a user entity
import { App } from '../app.interface';
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
// !<DEFAULT> code: mongoose_schema
import mongooseSchema from '../services/user/user.mongoose';
// !end
// !code: mongoose_imports // !end
// !code: mongoose_init // !end

const moduleExports = function (app: App) {
  const mongooseClient = app.get('mongooseClient');
  // !code: mongoose_func_init // !end

  // !code: mongoose_client
  const user = new mongooseClient.Schema(mongooseSchema, { timestamps: true });
  // !end

  const existingModel = mongooseClient.models.user; // needed for client/server tests
  const returns = existingModel || mongooseClient.model('user', user);

  // !code: mongoose_func_return // !end
  return returns;
};
// !code: mongoose_more // !end

// !code: mongoose_exports // !end
export default moduleExports;

// !code: mongoose_funcs // !end
// !code: mongoose_end // !end
