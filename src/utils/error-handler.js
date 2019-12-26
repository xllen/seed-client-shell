const logger = require('./logger')

function startGlobalErrorHandle() {
  process.on('uncaughtException', function (err) {
    logger.error('Uncaught Exception', err);
  })

  process.on('unhandleRejection', function (err) {
    logger.error('Unhandle Rejection', err);
  })
}

module.exports = {
  startGlobalErrorHandle
}
