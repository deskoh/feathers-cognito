
const jsonFile = require('jsonfile');
const { join } = require('path');
const doesFileExist = require('./does-file-exist');

module.exports = function readJsonFileSync(path) {
  let newPath = path;
  if (Array.isArray(path)) {
    newPath = join(...path);
  }

  return !doesFileExist(newPath) ? null : jsonFile.readFileSync(path, { throw: false });
};
