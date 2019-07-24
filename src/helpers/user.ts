import { App } from '../app.interface';

export const getUserName = async function (app: App, userId: string): Promise<string | undefined> {
  try {
    const user = await app.service('user').get(userId);
    return user.name;
  } catch (error) {
    return undefined;
  }
};
