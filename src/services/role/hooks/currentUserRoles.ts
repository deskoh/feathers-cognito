import { Hook, HookContext } from '@feathersjs/feathers';
import { checkContext } from 'feathers-hooks-common';

/**
 * Return current user roles for external calls.
 */
const currentUserRoles: Hook = function (context: HookContext) {
  // Skip if server call (called by authenticated hook in authentication-jwt\lib\verifier.js).
  if (!context.params.provider) return context;
  checkContext(context, 'before', ['get', 'find']);

  context.params.query = {
    name: {
      $nin: ['System'],
    },
  };

  return context;
};

export default currentUserRoles;
