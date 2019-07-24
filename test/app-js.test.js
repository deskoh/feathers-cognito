const assert = require('assert');
const app = require('../src/app');

describe('Feathers application JS tests', () => {
  it('should pass', () => {
    assert.ok(app.default.get('port') === 3030);
  });
});
