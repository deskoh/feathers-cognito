import { HookContext } from '@feathersjs/feathers';

import { App } from '@/app.interface';
import { User } from './user.interface';
import { Role } from '@/services/role/role.interface';

const userResolvers = {
  joins: {
    // activeWorkspace: () => async (user: User, context: HookContext) => {
    //   const service = (context.app as App).service('workspace');
    //   const result = await service.find({
    //     query: {
    //       _id: user.activeWorkspace,
    //     },
    //   }) as Workspace[];

    //   const workspace: Workspace = result[0] || { } as any;
    //   // eslint-disable-next-line no-param-reassign
    //   user.activeWorkspace = {
    //     _id: workspace._id,
    //     name: workspace.name,
    //   } as any;
    // },
    roles: ($select?: string[]) => async (user: User, context: HookContext) => {
      const service = (context.app as App).service('role');
      const roles = await service.find({
        query: {
          _id: { $in: user.roleIds },
          $select: $select || ['name'],
        },
      }) as Role[];

      // eslint-disable-next-line no-param-reassign
      user.roles = roles.map(r => r.name);
    },
  },
};

export default userResolvers;
