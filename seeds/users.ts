/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
/**
 * Default Users for seeding database.
 */

import { User } from '../src/services/user/user.interface';


const users: Readonly<User[]> = [
  {
    _id: 'system',
    name: 'System',
    password: '',
    roleIds: ['000000000000000000000001'],
  } as any,
  {
    _id: 'admin',
    name: 'Administrator',
    password: 'password',
    roleIds: ['000000000000000000000000', '000000000000000000000002'],
  } as User,
  {
    _id: 'user',
    name: 'User',
    password: 'password',
    roleIds: ['000000000000000000000000'],
  } as User,
];

export default users;
