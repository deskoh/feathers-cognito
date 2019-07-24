
// Configure the Feathers services. (Can be re-generated.)
import { App } from '../app.interface';
import role from './role/role.service';
import user from './user/user.service';

// !code: imports
// !end
// !code: init // !end

const moduleExports = function (app: App) {
  app.configure(role);
  app.configure(user);
  // !code: func_return // !end
};

// !code: exports // !end
export default moduleExports;

// !code: funcs // !end
// !code: end // !end
