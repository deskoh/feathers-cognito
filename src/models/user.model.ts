
// user-model.ts - A Sequelize model for user entity. (Can be re-generated.)
import merge from 'lodash.merge';
import { Sequelize } from 'sequelize';

import { App } from '@/app.interface';
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
// !<DEFAULT> code: sequelize_schema
import sequelizeSchema from '../services/user/user.sequelize';
// !end
// !code: sequelize_imports // !end
// !code: sequelize_init // !end

const moduleExports = function (app: App) {
  const sequelizeClient = app.get('sequelizeClient') as Sequelize;
  // !code: sequelize_func_init // !end

  const user = sequelizeClient.define('user',
    // !<DEFAULT> code: sequelize_model
    sequelizeSchema,
    // !end
    merge(
      // !<DEFAULT> code: sequelize_options
      {
        hooks: {
          beforeCount(options: any) {
            // eslint-disable-next-line no-param-reassign
            options.raw = true;
          },
        } as any,
      },
      // !end
      // !code: sequelize_define // !end
    ));

  (user as any).associate = function (/* models: any */) {
    // Define associations here for foreign keys
    //   - No foreign keys defined.
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    // !code: sequelize_associations // !end
  };

  // !code: sequelize_func_return // !end
  return user;
};
// !code: sequelize_more // !end

// !code: sequelize_exports // !end
export default moduleExports;

// !code: sequelize_funcs // !end
// !code: sequelize_end // !end
