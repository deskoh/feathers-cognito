/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
/**
 * Default Roles for seeding database.
 */

import { Role } from '../src/services/role/role.interface';

const roles: Readonly<Role[]> = [
  { _id: '000000000000000000000000', name: 'Everyone' } as Role,
  { _id: '000000000000000000000001', name: 'System' } as Role,
  { _id: '000000000000000000000002', name: 'Super Manager' } as Role,
];

export default roles;
