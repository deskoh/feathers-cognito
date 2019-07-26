import {
  Model, BuildOptions,
  HasManyGetAssociationsMixin, HasManySetAssociationsMixin, HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin, HasManyHasAssociationMixin, HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
} from 'sequelize';

interface User extends Model {
  id: number;
  cognitoId: string | null;
  name: string | null;
  email: string | null;

  // timestamps
  readonly createdAt: Date;
  readonly updatedAt: Date;

  // This will add methods *getUsers, setUsers, *addUser, *addUsers to Project,
  // and getProjects, setProjects, addProject, and addProjects to User.
  getRoles: HasManyGetAssociationsMixin<Role>;
  setRoles: HasManySetAssociationsMixin<Role, number>;
  addRole: HasManyAddAssociationMixin<Role, number>;
  addRoles: HasManyAddAssociationsMixin<Role, number>;

  hasRole: HasManyHasAssociationMixin<Role, number>;
  countRoles: HasManyCountAssociationsMixin;
  createRole: HasManyCreateAssociationMixin<Role>;
}

export type UserModel = typeof Model & {
  new (values?: object, options?: BuildOptions): User;
}

export interface Role extends Model {
  id: number;
  name: string | null;

  // timestamps
  readonly createdAt: Date;
  readonly updatedAt: Date;

  getUsers: HasManyGetAssociationsMixin<User>;
  setUsers: HasManySetAssociationsMixin<User, number>;
  addUser: HasManyAddAssociationMixin<User, number>;
  addUsers: HasManyAddAssociationsMixin<User, number>;

  hasUser: HasManyHasAssociationMixin<User, number>;
  countUsers: HasManyCountAssociationsMixin;
  createUser: HasManyCreateAssociationMixin<User>;
}

export type RoleModel = typeof Model & {
  new (values?: object, options?: BuildOptions): Role;
}
