const winston = require('winston');
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({
      filename: `logs/${process.env.NODE_ENV || 'development'}-seeds.log`,
      json: false
    })
  ]
});
logger.cli();

module.exports = logger;
