import { HookContext, Hook } from '@feathersjs/feathers';

import { User } from '../user.interface';

/**
 * Authentication 'before' hook to inject user fields into profile field of JWT payload.
 */
export default function <T extends keyof User> (...fieldNames: T[]): Hook {
  return (context: HookContext) => {
    // Make sure params.payload exists
    const { user } = context.params as { user: User };
    if (user) {
      context.params.payload = context.params.payload || {};

      const profile: Pick<User, T> = { } as any;
      fieldNames.forEach((key) => {
        profile[key] = user[key];
      });

      // Note: Do not 'spread' user object as it might contain password field.
      Object.assign(context.params.payload, { profile });
    }
    return context;
  };
}
