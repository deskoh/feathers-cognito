
/* tslint:disable:quotemark */
// Defines Sequelize model for service `user`. (Can be re-generated.)
import merge from 'lodash.merge';
import { DataTypes } from 'sequelize';
// !code: imports // !end
// !code: init // !end

// Your model may need the following fields:
//   email:      { type: DataTypes.STRING, allowNull: false, unique: true },
//   password:   { type: DataTypes.STRING, allowNull: false },
const moduleExports = merge(
  {},
  // !code: sequelize_model
  // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
  {
    cognitoId: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING, allowNull: false, unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    roleIds: {
      type: DataTypes.JSONB,
    },
  },
  // !end
  // !code: moduleExports // !end
);

// !code: exports // !end
export default moduleExports;

// !code: funcs // !end
// !code: end // !end
