const { BrowserWindow, globalShortcut } = require('electron');
const { getEmitter, EventType } = require('../events/events-handler');
const { IpcEventType } = require('../ipc/ipc-event-type');

const config = require('../shell-config');
const { maxWidth, minWidth, maxHeight, minHeight } = config.mainWindow;

const emitter = getEmitter();

const createWindow = (url) => {
  let force_quit = false;

  let window = new BrowserWindow({
    width: minWidth,
    minWidth: minWidth,
    maxWidth: maxWidth,
    height: minHeight,
    minHeight: minHeight,
    maxHeight: maxHeight,
    frame: false,
    show: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  window.loadURL(url);

  if (config.devTool) {
    window.webContents.openDevTools();
  } else {
    globalShortcut.register('Ctrl+Shift+i', () => {
      window.webContents.openDevTools();
    })
  }

  window.on('ready-to-show', () => {
    window.show();
  });

  window.on('closed', () => {
    window = null;
  })

  window.on('close', event => {
    if (!force_quit) {
      event.preventDefault();
      window.webContents.send(IpcEventType.WINDOW_WILL_CLOSE);
    }
  });

  emitter.on(EventType.MainWindow.CLOSE_MAIN_WINDOW, () => {
    force_quit = true;
    window.close()
  })

  emitter.on(EventType.MainWindow.MAXIMIZE_MAIN_WINDOW, () => {
    window.maximize();
    window.center();
  });

  emitter.on(EventType.MainWindow.MINIMIZE_MAIN_WINDOW, () => {
    if (window.isMinimized()) {
      window.restore();
    }
    window.setBounds({ width: minWidth, height: minHeight, x: 0, y: 0 }, true);
    window.center();
  });

  return window;
}

module.exports = {
  createWindow
}
