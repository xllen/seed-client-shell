const { EventEmitter } = require('events');

const emitter = new EventEmitter();

/**
 * 事件类型
 */
const EventType = {
  MainWindow: {
    // 关闭主窗口
    CLOSE_MAIN_WINDOW: 'CLOSE_MAIN_WINDOW',
    // 最大化主窗口
    MAXIMIZE_MAIN_WINDOW: 'MAXIMIZE_MAIN_WINDOW',
    // 缩小主窗口
    MINIMIZE_MAIN_WINDOW: 'MIN_MAIN_WINDOW'
  }
};

/**
 * 获取事件发射器
 */
function getEmitter() {
  return emitter;
};

module.exports = {
  getEmitter,
  EventType
}
