const gulp = require('gulp');
const path = require('path');
const gutil = require('gulp-util');
const fsExtra = require('fs-extra');
const { Walker } = require('pruner');

const { opts, Log } = require('../helpers');

gulp.task('copy-src', (callback) => {
  Log.info('Copying src to', gutil.colors.yellow(opts.out));
  try {
    fsExtra.copySync(opts.src, opts.out);
    callback();
  } catch (err) {
    Log.error(err);
    process.exit(1);
  }
});

gulp.task('copy-package', ['copy-src'], (callback) => {
  const src = path.join(opts.root, 'package.json');
  const dest = path.join(opts.buildTemp, 'package.json')
  Log.info('Copying package.json to', gutil.colors.yellow(dest));
  try {
    fsExtra.copySync(src, dest);
    callback();
  } catch (err) {
    Log.error(err);
    process.exit(1);
  }
});

gulp.task('copy-modules', ['copy-package'], function (callback) {
  const src = path.join(opts.root, 'node_modules')
  const dest = path.join(opts.buildTemp, 'node_modules')
  Log.info('Copying node_modules to', gutil.colors.yellow(dest));
  try {
    fsExtra.copySync(src, dest);
    callback();
  } catch (err) {
    Log.error(err);
    process.exit(1);
  }
})

gulp.task('prune', function (callback) {
  const modulesDestDir = path.join(opts.buildTemp);
  const walker = new Walker(modulesDestDir);
  Log.info('Pruning devDependencies in', gutil.colors.yellow(modulesDestDir));
  walker.prune()
    .then(() => {
      callback();
    }).catch(err => {
      Log.error(err);
      process.exit(1);
    });
})
