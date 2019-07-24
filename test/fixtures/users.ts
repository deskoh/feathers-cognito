import { User } from '@/services/user/user.interface';

import roles from './roles';

const userList = [{
  _id: 'admin',
  name: 'Admin' as const,
  password: 'password',
  roleIds: [roles.Manager._id, roles.Everyone._id],
  activeWorkspace: '',
}, {
  _id: 'alice',
  name: 'Alice' as const,
  password: 'password',
  roleIds: [roles.Everyone._id],
  activeWorkspace: '',
}, {
  _id: 'bob',
  name: 'Bob' as const,
  password: 'password',
  roleIds: [roles.Everyone._id],
  activeWorkspace: '',
}, {
  _id: 'charlie',
  name: 'Charlie' as const,
  password: 'password',
  roleIds: [roles.Everyone._id],
  activeWorkspace: '',
}, {
  _id: 'dave',
  name: 'Dave' as const,
  password: 'password',
  roleIds: [roles.Everyone._id],
  activeWorkspace: '',
}, {
  _id: 'eve',
  name: 'Eve' as const,
  password: 'password',
  roleIds: [roles.Everyone._id],
  activeWorkspace: '',
}];

// Record keys are string literal (for auto-completion) as userList type is inferred.
const users: Record<typeof userList[number]['name'], Readonly<User>> = { } as any;

userList.forEach((w) => {
  users[w.name] = w;
});

export default users;

const userListReadonly = userList as Readonly<User[]>;

export { userListReadonly as userList };
