import assert from 'assert';
import currentUser from '../../../../src/services/user/hooks/current-user';

describe('Test user/hooks/current-user.unit.test.ts', () => {
  let contextBefore: any;

  beforeEach(() => {
    contextBefore = {
      type: 'before',
      params: {
        user: {
          _id: 'dummy',
          name: 'john doe',
        },
        provider: 'xxx',
      },
    };
  });

  it('Hook exists', () => {
    assert(typeof currentUser === 'function', 'Hook is not a function.');
  });

  it('Hook returns current user', async () => {
    contextBefore.method = 'get';
    assert(true);
    await currentUser(contextBefore);
    assert.deepEqual(contextBefore.params.user, contextBefore.result);
  });
});
