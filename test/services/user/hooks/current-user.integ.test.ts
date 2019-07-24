import feathers, { Params, Service, Application } from '@feathersjs/feathers';
import assert from 'assert';
import { join } from 'path';
import { readJsonFileSync } from '@feathers-plus/test-utils';
import currentUser from '../../../../src/services/user/hooks/current-user';

// Get generated fake data
const fakeData = readJsonFileSync(join(__dirname, '../../../../seeds/fake-data.json')) || {};

describe('Test user/hooks/current-user.integ.test.ts', () => {
  let app: Application;
  let params: Params;
  let service: Service<any>;

  beforeEach(() => {
    app = feathers();

    app.use('/test-service', {
      async get() {
        assert(false, 'current-user hook should hijack result for external calls');
      },
    });

    app.service('/test-service').hooks({
      before: {
        get: [currentUser],
      },
    });

    service = app.service('/test-service');
    params = {
      user: (fakeData.users || [])[0] || {
        _id: 'test',
      },
      provider: 'xxx',
    };
  });


  it('Hook exists', () => {
    assert(typeof currentUser === 'function', 'Hook is not a function.');
  });

  it('Get returns current user', async () => {
    const result = await service.get('c', params);
    assert.deepEqual(result, params.user, 'Current user not returned.');
  });
});
