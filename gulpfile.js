const gulp = require('gulp');
const runSequence = require('run-sequence');
const { Log } = require('./scripts/helpers');

require('./scripts/gulp/gulp-clean');
require('./scripts/gulp/gulp-copy');
require('./scripts/gulp/gulp-package');

let _callback = null;

gulp.task('package', function (callback) {
  _callback = callback;
  return runSequence(
    'clean',
    'copy-modules',
    'prune',
    'package-win32-x64',
    'installer-win32-x64',
    runTaskCallback
  );
});

function runTaskCallback(error) {
  if (error) {
    Log.error(error.message);
    process.exit(1);
  }
  if (_callback) {
    _callback();
    Log.success('Tasks completed successfully !');
  }
};
