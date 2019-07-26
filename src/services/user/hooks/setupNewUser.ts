import { Hook, HookContext } from '@feathersjs/feathers';
import { checkContext } from 'feathers-hooks-common';

import { UserModel as UserModelType } from '@/models/sequelize';
import { User } from '../user.interface';

/**
 * Hook for setting up new user.
 */
const setupNewUser: Hook = async function (context: HookContext<User>) {
  checkContext(context, 'after', 'create', 'setupNewUser');

  const UserModel = (context.service as any).Model as UserModelType;
  const { models } = UserModel.sequelize || context.app.get('sequelizeClient');
  const [user, role] = await Promise.all([
    UserModel.findByPk(context.result && context.result.id),
    models.role.findOne({ where: { name: 'Everyone' } }),
  ]);
  if (user && role) {
    user.addRole(role);
  }
  return context;
};

export default setupNewUser;
