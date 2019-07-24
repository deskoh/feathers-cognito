
const { statSync } = require('fs');
const { join } = require('path');

module.exports = function doesFileExist(path, root = null) {
  const newPath = root ? join(root, path) : path;

  try {
    return statSync(newPath).isFile();
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
    return false;
  }
};
