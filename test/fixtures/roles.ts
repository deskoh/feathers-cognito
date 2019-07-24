import { Role } from '@/services/role/role.interface';

const roleList = [{
  _id: '000000000000000000000000',
  name: 'Everyone',
}, {
  _id: '000000000000000000000001',
  name: 'System',
}, {
  _id: '000000000000000000000002',
  name: 'Manager',
}];

// Record keys are string literal (for auto-completion) as roleList type is inferred.
const roles: Record<typeof roleList[number]['name'], Readonly<Role>> = { } as any;

roleList.forEach((role) => {
  roles[role.name] = role;
});

export default roles;

const roleListReadonly = roleList as Readonly<Role[]>;

export { roleListReadonly as roleList };
