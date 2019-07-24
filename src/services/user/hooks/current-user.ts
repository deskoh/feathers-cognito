import { Hook, HookContext } from '@feathersjs/feathers';
import { checkContext } from 'feathers-hooks-common';

const currentUser: Hook = function (context: HookContext) {
  // Skip if internal call (called by authenticated hook in authentication-jwt\lib\verifier.js).
  if (!context.params.provider) return context;
  checkContext(context, 'before', ['get', 'find']);

  // Never call actual user service and return authenticated user instead.
  context.result = context.params.user;
  return context;
};

export default currentUser;
