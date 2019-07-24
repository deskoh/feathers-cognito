import { Service } from '@feathersjs/feathers';
import assert from 'assert';

import app from '@/app';
import { App } from '@/app.interface';
import { User } from '@/services/user/user.interface';
import roles from '@/../seeds/roles';
import { mockId, getParams } from '../../utils';
import config from '../../../config/default.json';
import logger from '../../../src/logger';

// Determine if environment allows test to mutate existing DB data.
const env = (config.tests || {}).environmentsAllowingSeedData || [];
if (!env.includes(process.env.NODE_ENV)) {
  logger.info('SKIPPED - Test user/user.service.server.test.ts');
  // @ts-ignore
  return;
}

let service: Service<User>;

describe('Test user/user.service.server.test.ts', () => {
  before(async () => {
    // Trigger setup of app if app.listen is not called.
    // TODO (deskoh): Review following in feathers v4.
    // This is required for jwt strategy to be registered as users hook uses jwt strategy.
    app.setup();
  });

  beforeEach(async () => {
    service = (app as App).service('user');
    await (service as any)._remove(null);
  });

  it('disallow all unauthenticated external calls', async () => {
    const params = getParams(false, false);

    await assert.rejects(service.get(mockId, params));
    await assert.ok(service.create({}, params));
    await assert.rejects(service.update(mockId, null));
    await assert.rejects(service.patch(null, {}, params));
    await assert.rejects(service.remove(mockId, params));
  });

  it('new user with Everyone role and Welcome workspace when created', async () => {
    await (app.service('role') as any)._remove(null);
    await (app.service('role') as any)._create(roles);

    const params = getParams(false, true);

    const user = await service.create({ _id: '000000000011111111114444', name: 'des', password: 'zzz' }, params);

    assert(roles[0].name, 'Everyone');
    assert.strictEqual(user.roleIds.length, 1);
    assert.ok((user.roleIds[0] as any).equals(roles[0]._id));
  });
});
