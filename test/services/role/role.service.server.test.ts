import { Service } from '@feathersjs/feathers';
import assert from 'assert';

import app from '../../../src/app';
import { Role } from '../../../src/services/role/role.interface';
import config from '../../../config/default.json';
import logger from '../../../src/logger';
import { mockId, getParams } from '../../utils';

// Determine if environment allows test to mutate existing DB data.
const env = (config.tests || {}).environmentsAllowingSeedData || [];
if (!env.includes(process.env.NODE_ENV)) {
  logger.info('SKIPPED - Test role/role.service.server.test.ts');
  // @ts-ignore
  return;
}

let service: Service<Role>;

describe('Test role/role.service.server.test.ts', () => {
  beforeEach(async () => {
    service = app.service('role');
    await (service as any)._remove(null);
  });

  it('disallow specific unauthenticated external calls', async () => {
    const params = getParams(false, false);

    // await assert.rejects(service.find(params));
    await assert.rejects(service.get(mockId, params));
    await assert.rejects(service.create({}, params));
    await assert.rejects(service.update(mockId, { _id: '0', name: 'test' }));
    await assert.rejects(service.patch(null, {}, params));
    await assert.rejects(service.remove(mockId, params));
  });

  // it('disallow authenticated external calls', async () => {
  //   const params = getParams(false, true);

  //   await assert.rejects(service.find(params));
  //   await assert.rejects(service.get(mockId, params));
  //   await assert.rejects(service.create({
  //     _id: '000000000000000000000000',
  //     name: 'Everyone',
  //   } as any, params));
  //   await assert.rejects(service.update(mockId, { name: 'test' }));
  //   await assert.rejects(service.patch(null, {}, params));
  //   await assert.rejects(service.remove(mockId, params));
  // });
});
