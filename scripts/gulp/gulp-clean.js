const gulp = require('gulp');
const del = require('del');

const { isDirEmpty, getFullPath, Log } = require('../helpers');

// 清理目录
gulp.task('clean', function (callback) {
  if (isDirEmpty('./build')) {
    Log.info('Cleaning', getFullPath('./build'));
    del.sync(['./build/**']);
  }
  if (isDirEmpty('./dist')) {
    Log.info('Cleaning', getFullPath('./dist'));
    del.sync(['./dist/**']);
  }
  callback();
})
