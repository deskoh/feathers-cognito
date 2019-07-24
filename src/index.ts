/* tslint:disable no-console */
// Start the server. (Can be re-generated.)
// !code: preface // !end
import logger from './logger';
import app from './app';
// !code: imports // !end
// !code: init
require('https').globalAgent.options.rejectUnauthorized = false;

// process.env.https_proxy = 'http://127.0.0.1:8888';
// process.env.http_proxy = 'http://127.0.0.1:8888';
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// !end

const port = app.get('port');
const server = app.listen(port);
// !code: init2 // !end

process.on('unhandledRejection', (reason, p) => {
  // !<DEFAULT> code: unhandled_rejection_log
  logger.error('Unhandled Rejection at: Promise ', p, reason);
  console.log(reason);
  // !end
  // !code: unhandled_rejection // !end
});

server.on('listening', async () => {
  // !<DEFAULT> code: listening_log
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port);
  // !end
  await app.get('sequelizeClient');
  // !code: listening // !end
  // !code: listening1 // !end
});

// !code: funcs // !end
// !code: end // !end
