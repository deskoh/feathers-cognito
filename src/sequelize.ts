
// sequelize.ts - Sequelize adapter (other than SQL server)
import Sequelize from 'sequelize';
import merge from 'lodash.merge';
import { App } from './app.interface';

const { Op } = Sequelize;
// !code: imports // !end
// !code: init // !end

const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};

export default function (app: App) {
  const sequelize = new Sequelize(merge(
    app.get('postgres'),
    {
      dialect: 'postgres',
      logging: false,
      operatorsAliases,
      define: {
        freezeTableName: true,
      },
    },
  ));

  const oldSetup = app.setup;
  // !code: func_init // !end

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args: any[]) {
    const result = oldSetup.call(this, ...args);
    // !code: func_init // !end

    // Set up data relationships
    const { models } = sequelize;
    Object.keys(models).forEach((name) => {
      if ('associate' in models[name]) {
        models[name].associate!(models);
      }
    });

    // Sync to the database
    sequelize.sync();

    // !code: func_return // !end
    return result;
  };
  // !code: more // !end
}
// !code: funcs // !end
// !code: end // !end
