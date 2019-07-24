import { Hook, HookContext } from '@feathersjs/feathers';
import { checkContext } from 'feathers-hooks-common';
import { User } from '../user.interface';

/**
 * Hook for setting up new user.
 */
const setupNewUser: Hook = function (context: HookContext<User>) {
  checkContext(context, 'before', 'create', 'setupNewUser');
  const everyoneRoleIds = '000000000000000000000000';
  if (context.data) {
    // Set active workspace to be Everyone.
    // currently active workspace not required
    // context.data.activeWorkspace = '000000000000000000000000';

    // Set default role to Everyone if it is not found
    if (context.data.roleIds) {
      const roleIds = Array.isArray(context.data.roleIds)
        ? context.data.roleIds : [context.data.roleIds];
      if (context.data.roleIds.indexOf(everyoneRoleIds) === -1) {
        roleIds.push(everyoneRoleIds);
      }
    } else {
      context.data.roleIds = [everyoneRoleIds];
    }
  }

  return context;
};

export default setupNewUser;
