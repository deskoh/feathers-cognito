
// Define TypeScript interface for service `user`. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

export interface UserBase {
  // !<DEFAULT> code: interface
  cognitoId: string;
  email: string;
  name: string;
  password: string;
  roleIds: string[];
  // !end
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface User extends UserBase {
  // !code: more
  id: number;
  /**
   * Role names after join.
   */
  roles?: string[];
  // !end
}

// !code: funcs // !end
// !code: end // !end
