const fs = require('fs');
const path = require('path');
const gutil = require('gulp-util');

const { version, description } = require('../package.json');

const opts = {
  name: 'pivs-manager-client',
  version,
  description,
  root: path.resolve('.'),
  src: path.resolve('./src'),
  build: path.resolve('./build'),
  buildTemp: path.resolve('./build/temp'),
  out: path.resolve('./build/temp/out'),
  dist: path.resolve('./dist')
}

/**
 * 检查目录是否为空
 * @param {string} path 目录路径
 */
function isDirEmpty(path) {
  return path
    && fs.existsSync(path)
    && fs.statSync(path).isDirectory()
    && fs.readdirSync(path).length
}

/**
 * 获取完整路径
 * @param {string | Array<string>} relativePath 相对路径
 */
function getFullPath(relativePaths) {
  if (relativePaths && typeof relativePaths === 'string') {
    return gutil.colors.yellow(path.resolve(relativePaths));
  } else if (relativePaths && relativePaths instanceof Array) {
    return gutil.colors.yellow(relativePaths.map(p => path.resolve(p)));
  } else {
    return relativePaths
  }
}

const Log = {
  info: (msg, ...args) => gutil.log(msg, ...args),
  warn: (msg, ...args) => gutil.log(gutil.colors.yellow(msg), ...args),
  error: (msg, ...args) => gutil.log(gutil.colors.red(msg), ...args),
  success: (msg, ...args) => gutil.log(gutil.colors.green(msg), ...args)
}

module.exports = {
  opts,
  isDirEmpty,
  getFullPath,
  Log
}
