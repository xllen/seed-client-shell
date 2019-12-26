const { ipcMain, dialog } = require('electron');

const logger = require('../utils/logger');
const { getEmitter, EventType } = require('../events/events-handler');
const { IpcEventType } = require('./ipc-event-type');

const emitter = getEmitter();

/**
 * 开启主线程事件监听
 */
function startAllListeners() {
  // 记录UI线程日志
  ipcMain.on(IpcEventType.LOG, (event, args) => {
    const { level, loggerName, message } = args[0];
    logger[level](`[${loggerName}] ${message}`);
  });

  // 登录成功
  ipcMain.on(IpcEventType.LOGIN_SUCCESS, function (event, args) {
    logOnMessage(IpcEventType.LOGIN_SUCCESS);
    emitter.emit(EventType.MainWindow.MAXIMIZE_MAIN_WINDOW);
  })

  ipcMain.on(IpcEventType.LOGOUT, (event, args) => {
    emitter.emit(EventType.MainWindow.MINIMIZE_MAIN_WINDOW);
  });

  // 退出
  ipcMain.on(IpcEventType.APP_EXIT, function (event, args) {
    logOnMessage(IpcEventType.APP_EXIT);
    emitter.emit(EventType.MainWindow.CLOSE_MAIN_WINDOW);
  })
}

/**
 * 移除所有事件监听
 */
function removeListener(channel) {
  ipcMain.removeListener(channel);
}

/**
 * 事件响应时记录日志
 * @param {*} channel
 */
function logOnMessage(typeName, args) {
  logger.info(`On message: ${typeName}`, args);
}

module.exports = {
  startAllListeners,
  removeListener
}
