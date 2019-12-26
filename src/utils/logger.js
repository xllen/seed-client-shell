const { app } = require('electron');
const path = require('path');
const fs = require('fs');
const moment = require('moment');

const { Logger, transports } = require('winston');
require('winston-daily-rotate-file');

// exe文件所在目录
const exeDir = path.resolve(app.getPath('exe'), '..');

// exe同级目录下的logs目录
const logDir = path.join(exeDir, 'logs');

// 判断目录是否存在，如果不存在则创建目录
if (!fs.existsSync(logDir) || !fs.lstatSync(logDir).isDirectory()) {
  fs.mkdir(logDir, function(err) {});
}

// 日志日期格式化
const dateFormat = () => moment().format('YYYY-MM-DD HH:mm:ss.SSS');

// 单个日志文件大小
const MAX_SIZE = '20m';

// 保存日志文件数量
const MAX_FILES = '50';

// 日志文件名
const LOGGER_FILE_NAME = 'pivs-%DATE%.log';

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5
  },
  colors: {
    trace: 'gray',
    debug: 'gray',
    info: 'blue',
    warn: 'yellow',
    error: 'red',
    fatal: 'red'
  }
}

const options = {
  level: 'info',
  dirname: logDir,
  filename: LOGGER_FILE_NAME,
  maxSize: MAX_SIZE,
  maxFiles: MAX_FILES,
  timestamp: dateFormat
}

const transport = new transports.DailyRotateFile(options);

const logger = new Logger({
  levels: customLevels.levels,
  colors: customLevels.colors,
  transports: [transport]
});

global.logger = logger;

module.exports = logger;
