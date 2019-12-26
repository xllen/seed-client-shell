const gulp = require('gulp');
const gutil = require('gulp-util');
const packager = require('electron-packager');
const electronInstaller = require('electron-winstaller');

const { getFullPath, Log, opts } = require('../helpers');

var commonOptions = {
  dir: './build/temp',
  out: './build/',
  asar: {
    unpack: '**/*config.json'
  },
  name: opts.name,
  version: opts.version,
  ignore: [],
  buildVersion: opts.version,
  appVersion: opts.version,
  appCopyright: 'Copyright © 2018 gsafety',
  prune: false,
  overwrite: true
}

// win32 x64 平台打包
gulp.task('package-win32-x64', function (callback) {
  const win32Options = {
    platform: 'win32',
    arch: 'x64',
    icon: './assets/shell.ico',
    win32metadata: {
      CompanyName: 'gsafety',
      FileDescription: opts.description,
      OriginalFilename: 'electron.exe',
      ProductName: opts.name,
      InternalName: opts.name
    }
  }
  const options = Object.assign(commonOptions, win32Options);
  packager(options, function (err, appPaths) {
    if (err) {
      Log.error(err);
      process.exit(1);
    }
    if (appPaths) {
      Log.info('Package stored in', getFullPath(appPaths));
    }
    callback();
  })
})

// 制作win32 x64安装包
gulp.task('installer-win32-x64', function (callback) {
  Log.info('Creating installer for platform win32 x64', gutil.colors.gray('(this may take a while)'));

  const options = {
    appDirectory: `./build/${opts.name}-win32-x64`,
    outputDirectory: `./dist/${opts.name}-win32-x64`,
    loadingGif: './assets/loading.gif',
    authors: 'gsafety',
    exe: `${opts.name}.exe`,
    noMsi: 'true',
    name: opts.name,
    version: opts.version,
    setupExe: `${opts.name}-${opts.version}-setup.exe`
  }

  const resultPromise = electronInstaller.createWindowsInstaller(options);
  resultPromise.then((res) => {
    Log.info('Installer stored in', getFullPath(options.outputDirectory))
    callback();
  }, e => {
    Log.error(e.stack)
    process.exit(1);
  })
})
