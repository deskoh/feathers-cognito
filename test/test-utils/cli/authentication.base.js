/* eslint-disable @typescript-eslint/no-var-requires */

const assert = require('assert');
const { cwd } = require('process');

const expandSpecsForTest = require('./expand-specs-for-test');
const localStorage = require('../local-storage');
const loginAnonymous = require('../login-anonymous');
const loginLocal = require('../login-local');
const loginJwt = require('../login-jwt');
const makeClient = require('../make-client');

const defaultRoles = require('../../../seeds/roles').default;

// Note: Should match anonymous user in JSON configuration and user schema.
const testUser = {
  _id: '000000000000000009991234',
  name: 'test',
  email: 'test@test.local',
  password: 'orprotroiyotrtouuikj',
};

module.exports = function checkHealthAuthTest(appRoot = cwd(), options = {}) {
  const delayAfterServerClose = options.delayAfterServerClose || 500;
  const timeoutForStartingServerAndClient = options.timeoutForStartingServerAndClient || 30000;
  const timeoutForClosingingServerAndClient = options.timeoutForClosingingServerAndClient || 30000;

  const defaultJson = require(`${appRoot}/config/default.json`);
  const testJson = require(`${appRoot}/config/test.json`);
  const testAnonymousUser = testJson.authentication.anonymous.user;

  const configClient = (defaultJson.tests || {}).client;
  const port = configClient.port || 3030;
  const ioOptions = configClient.ioOptions || {
    transports: ['websocket'],
    forceNew: true,
    reconnection: false,
    extraHeaders: {},
  };
  const primusOptions = configClient.primusOptions || { transformer: 'ws' };
  const serverUrl = (configClient.restOptions || {}).url || 'http://localhost:3030';

  // Check if app generated with required features.
  const { err, genSpecs } = expandSpecsForTest(appRoot);

  // Run the tests.
  function tests({ transports, usersPath }) {
    transports.forEach((transport) => {
      describe(`Test ${transport} transport`, () => {
        let app;
        let server;
        let appClient;
        let jwt;

        beforeEach(function beforeEach(done) {
          this.timeout(timeoutForStartingServerAndClient);
          localStorage.clear();

          // Restarting app.*s is required if the last mocha test did REST calls on its server.
          delete require.cache[require.resolve(`${appRoot}/${genSpecs.app.src}/app`)];
          app = require(`${appRoot}/${genSpecs.app.src}/app`);
          if (genSpecs.options.ts) app = app.default;

          server = app.listen(port);
          server.once('listening', async () => {
            await app.get('mongooseConnection');
            const usersService = app.service(usersPath);
            const rolesService = app.service('role');

            await Promise.all([usersService._remove(null), rolesService._remove(null)]);
            await Promise.all([usersService.create(testUser), rolesService._create(defaultRoles)]);

            appClient = makeClient({
              transport, serverUrl, ioOptions, primusOptions,
            });
            done();
          });
        });

        afterEach(function afterEach(done) {
          this.timeout(timeoutForClosingingServerAndClient);
          server.close();
          setTimeout(() => done(), delayAfterServerClose);
        });

        // Run several tests together to reduce their runtime.
        it(`Can make anonymous authenticated call on ${usersPath} service`, async function test() {
          this.timeout(timeoutForStartingServerAndClient);

          await loginAnonymous(appClient);

          jwt = localStorage.getItem('feathers-jwt');

          assert(typeof jwt === 'string', 'jwt not a string');
          assert(jwt.length > 100, 'jwt too short');

          const usersClient = appClient.service(usersPath);
          const result = await usersClient.find({ query: { _id: testAnonymousUser._id } });
          const rec = result.data ? result.data[0] : result[0];

          assert.strictEqual(rec.name, testAnonymousUser.name, 'wrong name');
        });

        it(`Can make local authenticated call on ${usersPath} service`, async function test() {
          this.timeout(timeoutForStartingServerAndClient);

          await loginLocal(appClient, testUser._id, testUser.password);

          jwt = localStorage.getItem('feathers-jwt');

          assert(typeof jwt === 'string', 'jwt not a string');
          assert(jwt.length > 100, 'jwt too short');

          const usersClient = appClient.service(usersPath);
          const result = await usersClient.find({ query: { _id: testUser._id } });
          const rec = result.data ? result.data[0] : result[0];

          assert.strictEqual(rec.name, testUser.name, 'wrong name');
        });

        it(`Can make jwt authenticated call on ${usersPath} service`, async function test() {
          this.timeout(timeoutForStartingServerAndClient);

          await loginJwt(appClient, jwt);
          const jwt1 = localStorage.getItem('feathers-jwt');

          assert(typeof jwt1 === 'string', 'jwt not a string');
          assert(jwt1.length > 100, 'jwt too short');
          assert.notEqual(jwt1, jwt, 'new token unexpectedly same as authentication token.');

          const usersClient = appClient.service(usersPath);

          const result = await usersClient.find({ query: { _id: testUser._id } });
          const rec = result.data ? result.data[0] : result[0];

          assert.strictEqual(rec.name, testUser.name, 'wrong name');
        });
      });
    });
  }

  describe(`Test ${__filename.substring(__dirname.length + 1)}`, () => {
    it('Check this test can run', () => {
      assert.strictEqual(err, '', err);
    });

    if (!err) {
      tests({
        genSpecs,
        transports: genSpecs.app.providers,
        usersPath: genSpecs.authentication._entityPath,
      });
    }
  });
};
