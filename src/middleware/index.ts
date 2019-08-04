
// Configure middleware. (Can be re-generated.)
import { Application } from '@feathersjs/express';
import { App } from '../app.interface';

// !code: imports
import mockCognito from './mockCognito';
// !end
// !code: init // !end

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const moduleExports = function (app: App) {
  // !code: func_init // !end
  // Add your custom middleware here. Remember that
  // in Express, the order matters.
  // !code: middleware
  if (app.get('mockCognito')) {
    mockCognito(app as Application);
  }
  // !end
  // !code: func_return // !end
};

// !code: exports // !end
export default moduleExports;

// !code: funcs // !end
// !code: end // !end
