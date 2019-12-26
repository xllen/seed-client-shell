const { app } = require('electron');
const path = require('path');
const url = require('url');

const { startGlobalErrorHandle } = require('./utils/error-handler');
const { createWindow } = require('./ui/main-window');
const ipcHandler = require('./ipc/ipc-handler');
const logger = require('./utils/logger');
const config = require('./shell-config.json');

startGlobalErrorHandle();

if(require('electron-squirrel-startup')) {
  app.quit();
}

let loadUrl;
let mainWindow;

if (config.debug) {
  loadUrl = config.loadUrl;
} else {
  loadUrl = url.format({
    pathname: path.join(__dirname, '../node_modules/', config.loadPath),
    protocol: 'file:'
  })
}

app.on('ready', () => {
  logger.info('app on ready')
  mainWindow = createWindow(loadUrl);
  ipcHandler.startAllListeners();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    logger.info('app closed');
    app.quit();
  }
});

app.on('avtive', () => {
  if (mainWindow === null) {
    mainWindow = createWindow();
    mainWindow.show();
  }
});
