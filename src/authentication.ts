
// Configure authentication. (Can be re-generated.)
import authentication from '@feathersjs/authentication';
import oauth2 from '@feathersjs/authentication-oauth2';
import jwt from '@feathersjs/authentication-jwt';
import local from '@feathersjs/authentication-local';
import { HookContext } from '@feathersjs/feathers';

import { App } from './app.interface';
// !code: imports
import IdServerStrategy from './IdServerStrategy';
import anonymous from './anonymous';
import Verifier from './cognitoVerifier';
// !end
// !code: init // !end

const moduleExports = function (app: App) {
  const config = app.get('authentication');
  // !code: func_init // !end

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());
  // !code: loc_1
  app.configure(anonymous(config.anonymous));

  app.configure(oauth2(Object.assign({
    name: 'cognito',
    Strategy: IdServerStrategy,
    Verifier,
  }, config.cognito2)));
  // !end

  // !code: loc_2 // !end

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        // !code: before_create
        authentication.hooks.authenticate(config.strategies),
        // Add user payload to JWT.
        (context: HookContext) => {
          // make sure params.payload exists
          context.params.payload = context.params.payload || {};
          Object.assign(context.params.payload, { user: context.params.user });
        },
        // !end
      ],
      remove: [
        // !<DEFAULT> code: before_remove
        authentication.hooks.authenticate('jwt'),
        // !end
      ],
      // !code: before // !end
    },
    // !<DEFAULT> code: after
    after: {
    },
    // !end
  });
  // !code: func_return // !end
};

// !code: exports // !end
export default moduleExports;

// !code: funcs // !end
// !code: end // !end
