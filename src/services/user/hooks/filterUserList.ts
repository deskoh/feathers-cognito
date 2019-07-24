import { Hook, HookContext } from '@feathersjs/feathers';
import { checkContext } from 'feathers-hooks-common';

/**
 * Hook for Filtering Special User. e.g (System)
 */
const filterUserList: Hook = function (context: HookContext) {
  checkContext(context, 'after', ['get', 'find']);
  if (context.result) {
    const editedResult = context.result.filter((item: any) => (item.activeWorkspace !== null));
    context.result = editedResult;
    // displatch is included else won't work in front end.
    context.dispatch = editedResult;
  }
  return context;
};

export default filterUserList;
