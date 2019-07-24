
import { join } from 'path';
import { authenticationBase } from './test-utils';
import config from '../config/default.json';
import logger from '../src/logger';

// Determine if environment allows test to mutate existing DB data.
const env = (config.tests || {}).environmentsAllowingSeedData || [];
if (!env.includes(process.env.NODE_ENV) || process.argv.includes('--noclient')) {
  logger.info('SKIPPED - Test authentication.base.ts');
  // @ts-ignore
  return;
}

const appRoot = join(__dirname, '..');
authenticationBase(appRoot, {
  delayAfterServerOnce: 500,
  delayAfterServerClose: 500,
  timeoutForStartingServerAndClient: 30000,
  timeoutForClosingingServerAndClient: 30000,
});
