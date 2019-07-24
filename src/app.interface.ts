
// Application interface. (Can be re-generated.)
import { Application } from '@feathersjs/feathers';
import { Role } from './services/role/role.interface';
import { User } from './services/user/user.interface';
// !code: imports // !end
// !code: init
// TODO(deskoh): Export Feathers Application for client.
// !end

export type App = Application<{
  'role': Role;
  'user': User;
  // !code: moduleExports
  'authentication': any;
  // !end
}>;
// !code: funcs // !end
// !code: end // !end
