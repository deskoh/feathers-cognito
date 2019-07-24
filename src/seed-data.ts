/* eslint-disable no-console */
import { join } from 'path';
import { readJsonFileSync } from '@feathers-plus/test-utils';
import { App } from './app.interface';
import logger from './logger';
// !code: imports // !end

// Determine if command line argument exists for seeding data
const ifSeedServices = ['--seed', '-s'].some(str => process.argv.slice(2).includes(str));

// Determine if environment allows test to mutate existing DB data.
function areDbChangesAllowed(testConfig: { environmentsAllowingSeedData: string[] }) {
  const { environmentsAllowingSeedData = [] } = testConfig;
  if (process.env.NODE_ENV) {
    return environmentsAllowingSeedData.includes(process.env.NODE_ENV);
  }
  return false;
}

// Get generated fake data
const fakeData = readJsonFileSync(join(__dirname, '../seeds/fake-data.json')) || {};

// Get generated services
const { services } = readJsonFileSync(join(__dirname, '../feathers-gen-specs.json'));
// !code: init // !end

export default async function (app: App) {
  const ifDbChangesAllowed = areDbChangesAllowed(app.get('tests'));
  // !code: func_init // !end
  if (!ifSeedServices) return;
  if (!ifDbChangesAllowed) return;

  if (!Object.keys(fakeData).length) {
    logger.info('Cannot seed services as seed/fake-data.json doesn\'t have seed data.');
    return;
  }
  if (!services || !Object.keys(services).length) {
    logger.info('Cannot seed services as feathers-gen-specs.json has no services.');
    return;
  }

  Object.keys(services).forEach(async (serviceName) => {
    const { name, adapter, path } = services[serviceName];
    // !<DEFAULT> code: seed_select
    const doSeed = adapter !== 'generic';
    // !end

    if (doSeed) {
      if (fakeData[name] && fakeData[name].length) {
        try {
          const service = app.service(path);

          // Related PR: https://github.com/feathers-plus/generator-feathers-plus/pull/249
          if (services[serviceName].adapter === 'mongodb') {
            const db = await app.get('mongoClient');
            const serviceModel = await db.createCollection(services[serviceName].name, { });
            (service as any).Model = serviceModel;
          }

          // !<DEFAULT> code: seed_try
          const deleted = await service.remove(null);
          const result = await service.create(fakeData[name]);
          logger.info(
            `Seeded service ${name} on path ${path} deleting ${deleted.length} records, adding ${result.length}.`,
          );
          // !end
        } catch (err) {
          logger.info(`Error on seeding service ${name} on path ${path}`, err.message);
        }
      } else {
        logger.info(`Not seeding service ${name} on path ${path}. No seed data.`);
      }
    } else {
      logger.info(`Not seeding generic service ${name} on path ${path}.`);
    }
  });
  // !code: func_return // !end
}

// !code: funcs // !end
// !code: end // !end
