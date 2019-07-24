// mongoose.ts - Mongoose adapter
import mongoose from 'mongoose';
import logger from './logger';

import { App } from './app.interface';
// !code: imports // !end
// !code: init // !end

export default function (app: App) {
  mongoose.Promise = global.Promise;
  const mongooseConnection = mongoose.connect(app.get('mongodb'), { useNewUrlParser: true, useCreateIndex: true })
    .then(({ connection }: any) => {
      logger.info(`connected to "${connection.name}" database at ${connection.host}:${connection.port}`);
      return connection;
    })
    .catch((error) => {
      logger.error(error);
      process.exit(1);
    });
  // !code: func_init // !end

  app.set('mongooseClient', mongoose);
  app.set('mongooseConnection', mongooseConnection);
  // !code: more // !end
}

// !code: funcs // !end
// !code: end // !end
