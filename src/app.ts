
// Configure Feathers app. (Can be re-generated.)
// !code: preface // !end
import * as path from 'path';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';

// !<DEFAULT> code: favicon_import
import favicon from 'serve-favicon';
// !end

import feathers from '@feathersjs/feathers';
import configuration from '@feathersjs/configuration';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';
import sync from 'feathers-sync';
import logger from './logger';

import middleware from './middleware';
import services from './services';
import appHooks from './app.hooks';
import channels from './channels';
import authentication from './authentication';
import sequelize from './sequelize';
// tslint:disable-next-line
// const generatorSpecs = require('../feathers-gen-specs.json');
// !code: imports // !end
// !code: init // !end

const app = express(feathers());
// !code: use_start // !end

// Load app configuration
app.configure(configuration());
// !code: init_config
// eslint-disable-next-line @typescript-eslint/no-var-requires
const generatorSpecs = require('../feathers-gen-specs.json');

app.set('generatorSpecs', generatorSpecs);
// !end

// Enable security, CORS, compression, favicon and body parsing
app.use(helmet(
  // !code: helmet_config // !end
));
app.use(cors(
  // !code: cors_config // !end
));
app.use(compress(
  // !code: compress_config // !end
));
app.use(express.json(
  // !code: json_config // !end
));
app.use(express.urlencoded(
  // !code: urlencoded_config
  { extended: true },
  // !end
));
// !<DEFAULT> code: use_favicon
// Use favicon
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// !end
// !<DEFAULT> code: use_static
// Host the public folder
app.use('/', express.static(app.get('public')));
// !end
// !code: use_end // !end

// Set up Plugins and providers
// !code: config_start
if (process.env.SYNC) {
  app.configure(sync(app.get('sync')));
}
// !end
app.configure(express.rest(
  // !code: express_rest // !end
));
app.configure(socketio(
  // !code: express_socketio
  (io) => {
    io.use((socket, next) => {
      // add socket id to connection object
      const { feathers: feathersSocket } = socket as any;
      feathersSocket.socketId = socket.id;
      next();
    });
  },
  // !end
));
// Configure database adapters
app.configure(sequelize);

// Configure other middleware (see `middleware/index.ts`)
app.configure(middleware);
// Configure authentication (see `authentication.ts`)
app.configure(authentication);
// Set up our services (see `services/index.ts`)
app.configure(services);
// Set up event channels (see channels.ts)
app.configure(channels);
// !code: config_middle // !end

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));
// !code: config_end // !end

app.hooks(appHooks);

const moduleExports = app;
// !code: exports // !end
export default moduleExports;

// !code: funcs // !end
// !code: end // !end
