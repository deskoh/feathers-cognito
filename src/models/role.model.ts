import merge from 'lodash.merge';
import { Sequelize } from 'sequelize';

// role-model.ts - A Sequelize model. (Can be re-generated.)
import { App } from '../app.interface';
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
// !<DEFAULT> code: sequelize_schema
import sequelizeSchema from '../services/role/role.sequelize';
// !end
// !code: sequelize_imports
import { RoleModel } from './sequelize';
// !end
// !code: sequelize_init // !end

const moduleExports = function (app: App) {
  const sequelizeClient = app.get('sequelizeClient') as Sequelize;
  // !code: sequelize_func_init // !end

  const role = sequelizeClient.define('role',
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
    )) as RoleModel;

  (role as any).associate = function (models: any) {
    // !code: sequelize_associations
    role.belongsToMany(models.user, { through: 'UserRole' });
    // !end
  };

  // !code: sequelize_func_return // !end
  return role;
};
// !code: sequelize_more // !end

// !code: sequelize_exports // !end
export default moduleExports;

// !code: sequelize_funcs // !end
// !code: sequelize_end // !end
