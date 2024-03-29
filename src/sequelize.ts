
// sequelize.ts - Sequelize adapter (other than SQL server)
import { Sequelize, Op } from 'sequelize';
import merge from 'lodash.merge';
import { App } from './app.interface';
import logger from './logger';

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

  // eslint-disable-next-line no-param-reassign
  app.setup = function (...args: any[]) {
    const result = oldSetup.call(this, ...args);
    // !code: func_init // !end

    // Set up data relationships
    const { models } = sequelize;
    Object.keys(models).forEach((name) => {
      if ('associate' in models[name]) {
        (models[name] as any).associate(models);
      }
    });

    sequelize.authenticate().then(() => {
      logger.info('Connection has been established successfully.');
      // Clear tables if force is true
      return sequelize.sync({ alter: true /* , force: true */ });
      // Sync to the database
    })
      .catch((err: Error) => {
        logger.error('Unable to connect to the database:', err);
        process.exit(1);
      });

    // !code: func_return // !end
    return result;
  };
  // !code: more // !end
}
// !code: funcs // !end
// !code: end // !end
